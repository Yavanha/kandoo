import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSubtaskDto } from './create-subtask.dto';
import { DataSource, EntityManager } from 'typeorm';
import { Subtask } from './subtask.entity';
import { UpdateSubtaskDto } from './update-subtask.dto';

@Injectable()
export class SubtasksService {
  constructor(private readonly datasource: DataSource) {}

  async create(createSubtaskDto: CreateSubtaskDto) {
    return await this.datasource.manager.save(Subtask, createSubtaskDto);
  }

  async findAll() {
    return await this.datasource.manager.find(Subtask);
  }

  async findOne(id: string) {
    return await this.datasource.manager.findOne(Subtask, {
      where: { id },
    });
  }

  async remove(id: string) {
    await this.tryToRetrieveSubtask(id);
    return await this.datasource.manager.delete(Subtask, id);
  }

  async update(id: string, updateSubtaskDto: UpdateSubtaskDto) {
    const { isCompleted, title } = updateSubtaskDto;
    const subTask = await this.tryToRetrieveSubtask(id);
    if (title) {
      subTask.title = title;
    }
    const updatedSubtask = await this.datasource.manager.save(Subtask, {
      ...subTask,
      isCompleted,
    });
    return updatedSubtask;
  }

  public ensureUniqueSubtaskTitle(subTask: (CreateSubtaskDto | Subtask)[]) {
    const uniqueSubtaskTitle = new Set(subTask.map(({ title }) => title));
    if (uniqueSubtaskTitle.size < subTask.length) {
      throw new ConflictException(
        'All Subtask Names must be unique, please provide unique names',
      );
    }
  }

  public async tryToRetrieveSubtask(id: string, em?: EntityManager) {
    const entityManager = this.ensureEntityManager(em);
    const subTask = await entityManager.findOne(Subtask, {
      where: { id },
    });

    if (!subTask) {
      throw new NotFoundException(`Subtask with id ${id} not found`);
    }
    return subTask;
  }

  private ensureEntityManager(em?: EntityManager) {
    return em || this.datasource.manager;
  }
}
