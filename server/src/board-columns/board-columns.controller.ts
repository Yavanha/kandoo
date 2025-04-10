import { Body, Controller, Post, Param, Get, Patch } from '@nestjs/common';
import { CreateTaskDto } from '../tasks/dto/create-task.dto';
import { BoardColumnsService } from './board-columns.service';
import { FindOneParam } from 'src/common/params/find-one.param';
import { UpdateTaskParam } from './update-task.param';
import { UpdateTaskDto } from 'src/tasks/dto/update-task.dto';
@Controller('api/columns')
export class BoardColumnsController {
  constructor(private readonly boardColumnsService: BoardColumnsService) {}

  @Get(':id/tasks')
  findAll(@Param('id') id: string) {
    return this.boardColumnsService.findAllTasksByColumnId(id);
  }

  @Post(':id/tasks')
  createTask(
    @Param() { id }: FindOneParam,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.boardColumnsService.addTaskToColumn(id, createTaskDto);
  }

  @Patch(':id/tasks/:taskId')
  updateTask(
    @Param() { id, taskId }: UpdateTaskParam,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.boardColumnsService.updateTask(id, taskId, updateTaskDto);
  }
}
