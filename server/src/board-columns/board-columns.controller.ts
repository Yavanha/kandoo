import { Body, Controller, Post, Param, Get } from '@nestjs/common';
import { CreateTaskDto } from '../tasks/dto/create-task.dto';
import { BoardColumnsService } from './board-columns.service';

@Controller('api/columns')
export class BoardColumnsController {
  constructor(private readonly boardColumnsService: BoardColumnsService) {}


  @Get(':id/tasks')
  findAll(@Param('id') id: string) {
    return this.boardColumnsService.findAllTasksByColumnId(id);
  }

  @Post(':id/tasks')
  createTask(@Param('id') id: string, @Body() createTaskDto: CreateTaskDto) {
    return this.boardColumnsService.addTaskToColumn(id, createTaskDto);
  }
}
