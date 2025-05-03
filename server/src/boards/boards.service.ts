import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { DataSource, EntityManager } from 'typeorm';
import { Board } from './board.entity';
import { CreateBoardDto } from './create-board.dto';

import { UpdateBoardDto } from './update-board.dto';
import { BoardColumnsService } from 'src/board-columns/board-columns.service';
import { CreateBoardColumnDto } from 'src/board-columns/create-board-column.dto';

@Injectable()
export class BoardsService {
  constructor(
    private dataSource: DataSource,
    private boardColumnsService: BoardColumnsService,
  ) {}

  public async create(createBoardDto: CreateBoardDto) {
    await this.confirmBoardIntegrity(createBoardDto);
    const board = this.dataSource.manager.create(Board, {
      ...createBoardDto,
    });
    return await this.dataSource.manager.save(Board, board);
  }

  public async addColumnToBoard(
    boardId: string,
    createBoardColumnDto: CreateBoardColumnDto,
  ) {
    return await this.boardColumnsService.addColumnToBoard(
      boardId,
      createBoardColumnDto,
    );
  }

  public async findAll() {
    return await this.dataSource.manager.find(Board);
  }

  public async findOne(id: string) {
    return this.tryToRetrieveBoardById(id);
  }

  public async tryToRetrieveBoardById(id: string, em?: EntityManager) {
    const entityManager = this.ensureEntityManager(em);
    const board = await entityManager.findOne(Board, {
      where: { id },
      order: {
        columns: {
          createdAt: 'ASC',
          tasks: {
            createdAt: 'ASC',
            subtasks: {
              createdAt: 'ASC',
            },
          },
        },
      },
      relations: {
        columns: {
          tasks: {
            subtasks: true,
          },
        },
      },
    });
    if (!board) {
      throw new NotFoundException(`Board with id ${id} not found`);
    }
    return board;
  }

  public async update(boardId: string, updateBoarDto: UpdateBoardDto) {
    const {
      name: updateBoardName,
      columns: updateBoardColumns,
      removeColumnIds,
    } = updateBoarDto;
    if (!updateBoardName && !updateBoardColumns && !removeColumnIds) {
      return await this.tryToRetrieveBoardById(boardId);
    }

    return await this.dataSource.transaction(async (manager) => {
      const board = await this.tryToRetrieveBoardById(boardId, manager);

      if (updateBoardName) {
        await this.validateUniqueBoardName(updateBoardName, manager);
        board.name = updateBoardName;
      }

      board.columns = await this.boardColumnsService.update(
        boardId,
        removeColumnIds,
        updateBoardColumns,
        manager,
      );
      return await manager.save(Board, board);
    });
  }

  async remove(id: string) {
    await this.tryToRetrieveBoardById(id, this.dataSource.manager);
    await this.dataSource.manager.delete(Board, id);
  }
  private async confirmBoardIntegrity(
    board: CreateBoardDto,
    em?: EntityManager,
  ) {
    await this.validateUniqueBoardName(board.name, em);
    if (board.columns)
      this.boardColumnsService.ensureUniqueColumnTitles(board.columns);
  }

  private async validateUniqueBoardName(name: string, em?: EntityManager) {
    const entityManager = this.ensureEntityManager(em);
    const existingBoard = await entityManager.findOne(Board, {
      where: { name },
    });
    if (existingBoard) {
      throw new ConflictException(`Board with name ${name} already exists`);
    }
  }

  private ensureEntityManager(em?: EntityManager) {
    return em || this.dataSource.manager;
  }
}
