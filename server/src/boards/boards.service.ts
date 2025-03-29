import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBoardDto } from './create-board.dto';
import { UpdateBoardColumnDto } from 'src/board-columns/update-board-column.dto';
import { CreateBoardColumnDto } from 'src/board-columns/create-board-column.dto';

import { BoardColumn } from 'src/board-columns/board-column.entity';
import { UpdateBoardDto } from './update-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardsRepository: Repository<Board>,
    @InjectRepository(BoardColumn)
    private readonly boardColumnsRepository: Repository<BoardColumn>,
  ) {}

  async create(createBoardDto: CreateBoardDto) {
    await this.checkIfBoardIsValid(createBoardDto);
    return await this.boardsRepository.save(createBoardDto);
  }

  async addColumnToBoard(
    boardId: string,
    createBoardColumnDto: CreateBoardColumnDto,
  ) {
    const board = await this.tryToRetrieveBoard(boardId);
    const { title } = createBoardColumnDto;
    await this.checkIfBoardColumnExists(boardId, title);
    const newBoardColumn = this.boardColumnsRepository.create({
      ...createBoardColumnDto,
      boardId: board.id,
    });
    return await this.boardColumnsRepository.save(newBoardColumn);
  }

  async findAll() {
    return await this.boardsRepository.find();
  }

  async findOne(id: string) {
    return await this.boardsRepository.findOne({
      where: { id },
      relations: ['columns'],
    });
  }

  public async tryToRetrieveBoard(id: string) {
    const board = await this.findOne(id);
    if (!board) {
      throw new NotFoundException(`Board with id ${id} not found`);
    }
    return board;
  }
  async findByName(name: string) {
    return await this.boardsRepository.findOne({
      where: { name },
    });
  }
  async update(boardId: string, updateBoarDto: UpdateBoardDto) {
    const {
      name: updateBoardName,
      columns: updateBoardColumns,
      removeColumnIds,
    } = updateBoarDto;
    if (!updateBoardName && !updateBoardColumns && !removeColumnIds) return;
    const board = await this.tryToRetrieveBoard(boardId);
    board.columns = await this.removeBoardColumns(removeColumnIds, board);

    if (updateBoardName) {
      await this.checkIfBoardExists(updateBoardName);
      board.name = updateBoardName;
    }

    if (updateBoardColumns) {
      const updateColumns = this.updateBoardColumns(
        board.columns,
        updateBoardColumns,
      );
      this.checkIfBoardColumnsUnique(updateColumns);
      board.columns = updateColumns;
    }
    return await this.boardsRepository.save(board);
  }

  async remove(id: string) {
    await this.tryToRetrieveBoard(id);
    await this.boardsRepository.delete(id);
  }

  private async checkIfBoardIsValid(board: CreateBoardDto) {
    await this.checkIfBoardExists(board.name);
    if (board.columns) this.checkIfBoardColumnsUnique(board.columns);
  }

  private async checkIfBoardExists(name: string) {
    const existingBoard = await this.findByName(name);
    if (existingBoard) {
      throw new ConflictException(`Board with name ${name} already exists`);
    }
  }

  private async checkIfBoardColumnExists(boardId: string, title: string) {
    const existingBoardColumn = await this.boardColumnsRepository.findOne({
      where: { title, boardId },
    });
    console.log('existingBoardColumn', existingBoardColumn);
    if (existingBoardColumn) {
      throw new ConflictException(
        `Board Column with the title ${title} already exists in the board`,
      );
    }
  }

  private checkIfBoardColumnsUnique(
    columns: (BoardColumn | CreateBoardColumnDto)[],
  ) {
    const uniqueColumnTitle = new Set(columns.map(({ title }) => title));
    if (uniqueColumnTitle.size < columns.length) {
      throw new ConflictException(
        'All Column Names must be unique, please provide unique names',
      );
    }
  }

  private async removeBoardColumns(ids: string[] | undefined, board: Board) {
    if (ids) {
      await this.boardColumnsRepository.delete(ids);
      return board.columns.filter(({ id }) => !ids.includes(id));
    }
    return board.columns;
  }

  private updateBoardColumns(
    existingBoardColumn: BoardColumn[],
    updateBoardColumnsDto: UpdateBoardColumnDto[],
  ) {
    const columnMap = new Map<string, BoardColumn>(
      existingBoardColumn.map((column) => [column.id, column]),
    );
    const newColumns: BoardColumn[] = [];
    for (const { id, title } of updateBoardColumnsDto) {
      if (id) {
        const column = columnMap.get(id);
        if (column) {
          column.title = title;
        }
      } else {
        newColumns.push(
          this.boardColumnsRepository.create({
            title,
          }),
        );
      }
    }
    newColumns.unshift(...columnMap.values());
    return newColumns;
  }
}
