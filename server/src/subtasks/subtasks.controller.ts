import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { SubtasksService } from './subtasks.service';
import { CreateSubtaskDto } from './create-subtask.dto';
import { UpdateSubtaskDto } from './update-subtask.dto';

@Controller('api/subtasks')
export class SubtasksController {
  constructor(private readonly subtasksService: SubtasksService) {}

  @Post()
  async create(@Body() createSubtaskDto: CreateSubtaskDto) {
    return await this.subtasksService.create(createSubtaskDto);
  }

  @Get()
  async findAll() {
    return await this.subtasksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.tryToRetrieveSubtask(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSubtaskDto: UpdateSubtaskDto,
  ) {
    const subTask = await this.tryToRetrieveSubtask(id);
    return await this.subtasksService.update(subTask, updateSubtaskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.subtasksService.remove(id);
  }

  private async tryToRetrieveSubtask(id: string) {
    const subTask = await this.subtasksService.findOne(id);
    if (!subTask) {
      throw new NotFoundException(`Subtask with id ${id} not found`);
    }
    return subTask;
  }
}
