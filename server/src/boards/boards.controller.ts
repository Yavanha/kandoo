import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './create-board.dto';
import { FindOneParam } from 'src/common/params/find-one.param';
import { UpdateBoardDto } from './update-board.dto';
import { CreateBoardColumnDto } from 'src/board-columns/create-board-column.dto';
@Controller('api/boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  async create(@Body() createBoardDto: CreateBoardDto) {
    return await this.boardsService.create(createBoardDto);
  }

  @Post(':id/columns')
  async addColumnToBoard(
    @Param() { id }: FindOneParam,
    @Body() createBoardColumnDto: CreateBoardColumnDto,
  ) {
    return await this.boardsService.addColumnToBoard(id, createBoardColumnDto);
  }

  @Get()
  async findAll() {
    return await this.boardsService.findAll();
  }

  @Get(':id')
  async findOne(@Param() { id }: FindOneParam) {
    return await this.boardsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param() { id }: FindOneParam,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    return this.boardsService.update(id, updateBoardDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param() { id }: FindOneParam) {
    await this.boardsService.remove(id);
  }
}
