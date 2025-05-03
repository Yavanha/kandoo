import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { SubtasksService } from './subtasks.service';
import { CreateSubtaskDto } from './create-subtask.dto';
import { FindOneParam } from 'src/common/params/find-one.param';
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
    return await this.subtasksService.tryToRetrieveSubtask(id);
  }

  @Patch(':id')
  async update(
    @Param() { id }: FindOneParam,
    @Body() updateSubtaskDto: UpdateSubtaskDto,
  ) {
    return await this.subtasksService.update(id, updateSubtaskDto);
  }

  @Delete(':id')
  async remove(@Param('id') { id }: FindOneParam) {
    return await this.subtasksService.remove(id);
  }
}
