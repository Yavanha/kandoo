import { ConflictException, Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBoardDto } from './create-board.dto';
// import { BoardColumn } from 'src/board-columns/board-column.entity';
import { UpdateBoardColumnDto } from 'src/board-columns/update-board-column.dto';
import { CreateBoardColumnDto } from 'src/board-columns/create-board-column.dto';
import { PatchOperationDto } from './patch-operation.dto';
import { applyPatch } from '@kandoo/shared';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardsRepository: Repository<Board>,
    // @InjectRepository(BoardColumn)
    // private readonly boardColumnsRepository: Repository<BoardColumn>,
  ) {}

  async create(createBoardDto: CreateBoardDto) {
    await this.checkIfBoardIsValid(createBoardDto);
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
  async update(board: Board, patchOperationDto: PatchOperationDto) {
    const { operations } = patchOperationDto;
    const updatedBoard = applyPatch<Board>(board, operations).newDocument;
    console.log({ updatedBoard });
    return await new Promise((resolve) => {
      resolve(board);
    });
  }

  async remove(id: string) {
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

  private checkIfBoardColumnsUnique(
    columns: (UpdateBoardColumnDto | CreateBoardColumnDto)[],
  ) {
    const uniqueColumnTitle = new Set(columns.map(({ title }) => title));
    if (uniqueColumnTitle.size < columns.length) {
      throw new ConflictException(
        'All Column Names must be unique, please provide unique names',
      );
    }
  }
}
