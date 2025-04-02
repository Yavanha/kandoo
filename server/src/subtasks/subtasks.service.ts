import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubtaskDto } from './create-subtask.dto';
import { UpdateSubtaskDto } from './update-subtask.dto';
import { DataSource, EntityManager } from 'typeorm';
import { Subtask } from './subtask.entity';

@Injectable()
export class SubtasksService {
  constructor(
    private readonly datasource: DataSource,
  ) {}

  async create(createSubtaskDto: CreateSubtaskDto) {
    return await this.datasource.manager.save(Subtask, createSubtaskDto);
  }

  async findAll() {
    return await this.datasource.manager.find(Subtask);
  }

  async findOne(id: string) {
    return await this.datasource.manager.findOneBy(Subtask, { id });
  }

  async update(subTask: Subtask, updateSubtaskDto: UpdateSubtaskDto) {
    Object.assign(subTask, updateSubtaskDto);
    return await this.datasource.manager.save(subTask);
  }

  async remove(id: string) {
    return await this.datasource.manager.delete(Subtask, id);
  }


  public ensureUniqueSubtaskTitle(subTask: (CreateSubtaskDto | Subtask)[], em?: EntityManager) {
    const uniqueSubtaskTitle = new Set(subTask.map(({ title }) => title));
    if (uniqueSubtaskTitle.size < subTask.length) {
      throw new ConflictException(
        'All Subtask Names must be unique, please provide unique names',
      );
    }
  }



  private async tryToRetrieveSubtask(id: string) {
    const subTask = await this.findOne(id);
    if (!subTask) {
      throw new NotFoundException(`Subtask with id ${id} not found`);
    }
    return subTask;
  }

  private ensureEntityManager(em?: EntityManager) {
    return em || this.datasource.manager;
  }
}
