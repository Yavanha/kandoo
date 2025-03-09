import { ConflictException, Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBoardDto } from './create-board.dto';
import { UpdateBoardDto } from './update-board.dto';
import { BoardColumn } from 'src/board-columns/board-column.entity';
import { UpdateBoardColumnDto } from 'src/board-columns/update-board-column.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardsRepository: Repository<Board>,
    @InjectRepository(BoardColumn)
    private readonly boardColumnsRepository: Repository<BoardColumn>,
  ) {}

  async create(createBoardDto: CreateBoardDto) {
    await this.checkIfBoardExists(createBoardDto.name);
    return await this.boardsRepository.save(createBoardDto);
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

  async findByName(name: string) {
    return await this.boardsRepository.findOne({
      where: { name },
    });
  }
  async update(board: Board, updateBoardDto: UpdateBoardDto) {
    const { name: boardName, columns: updateBoardColumns } = updateBoardDto;
    if (!boardName && !updateBoardColumns) return board;
    if (boardName) {
      await this.checkIfBoardExists(boardName);
      board.name = boardName;
    }
    if (updateBoardColumns) {
      board.columns = this.updateBoardColumns(
        board.columns,
        updateBoardColumns,
      );
    }
    return await this.boardsRepository.save(board);
  }

  async remove(id: string) {
    await this.boardsRepository.delete(id);
  }

  private async checkIfBoardExists(name: string) {
    const existingBoard = await this.findByName(name);
    if (existingBoard) {
      throw new ConflictException(`Board with name ${name} already exists`);
    }
  }

  updateBoardColumns(
    existingBoardColumns: BoardColumn[],
    updatedBoardColumns: UpdateBoardColumnDto[],
  ) {
    const updatedColumns: BoardColumn[] = [];
    updatedBoardColumns.forEach(({ id, title }) => {
      if (!id && title) {
        const newBoardColumn = this.boardColumnsRepository.create({ title });
        updatedColumns.push(newBoardColumn);
        return;
      }
      const existingBoardColumn = existingBoardColumns.find(
        (column) => column.id === id,
      );
      if (existingBoardColumn && title) {
        existingBoardColumn.title = title;
        updatedColumns.push(
          this.boardColumnsRepository.create(existingBoardColumn),
        );
      }
    });
    return updatedColumns;
  }
}
