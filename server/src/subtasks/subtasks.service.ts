import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSubtaskDto } from './create-subtask.dto';
import { DataSource, EntityManager } from 'typeorm';
import { Subtask } from './subtask.entity';
import { UpdateSubtaskDto } from './update-subtask.dto';
import { UpdateSubtasksDto } from './update-subtasks.dto';

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

  public async applySubtaskChanges(
    taskId: string,
    removeSubtaskIds: string[] | undefined,
    updateSubtasks: UpdateSubtasksDto[] | undefined,
    manager?: EntityManager,
  ) {
    let subtasks = await this.retrieveSubtasksFromTask(taskId, manager);
    if (!removeSubtaskIds && !updateSubtasks) {
      return subtasks;
    }

    if (removeSubtaskIds) {
      subtasks = await this.removeSubtasks(removeSubtaskIds, subtasks, manager);
    }

    if (updateSubtasks) {
      subtasks = this.refreshSubtasks(updateSubtasks, subtasks, manager);
      this.ensureUniqueSubtaskTitle(subtasks);
    }
    return subtasks;
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

  private async retrieveSubtasksFromTask(
    taskId: string,
    manager?: EntityManager,
  ) {
    const entityManager = this.ensureEntityManager(manager);
    return await entityManager.find(Subtask, {
      where: { taskId },
    });
  }

  private async removeSubtasks(
    ids: string[] | undefined,
    existingSubtasks: Subtask[],
    em?: EntityManager,
  ) {
    if (ids) {
      const entityManager = this.ensureEntityManager(em);
      await entityManager.delete(Subtask, ids);
      return existingSubtasks.filter((subtask) => !ids.includes(subtask.id));
    }
    return existingSubtasks;
  }

  private refreshSubtasks(
    updateSubtasksDto: UpdateSubtasksDto[],
    existingSubtasks: Subtask[],
    em?: EntityManager,
  ) {
    const subtaskMap = this.transformSubtasksToMap(existingSubtasks);
    const newSubtasks: Subtask[] = [];
    for (const subtask of updateSubtasksDto) {
      const { id, title } = subtask;
      this.renameExistingSubtasks(subtask, subtaskMap);
      if (!id && title) {
        const newSubtask = this.createNewSubtask(title, em);
        newSubtasks.push(newSubtask);
      }
    }
    newSubtasks.unshift(...subtaskMap.values());
    return newSubtasks;
  }

  private transformSubtasksToMap(subtasks: Subtask[]) {
    return new Map<string, Subtask>(
      subtasks.map((subtask) => [subtask.id, subtask]),
    );
  }

  private renameExistingSubtasks(
    data: UpdateSubtasksDto,
    subtasksMap: Map<string, Subtask>,
  ) {
    const { id, title, isCompleted } = data;
    if (id) {
      const subtask = subtasksMap.get(id);
      if (subtask) {
        if (title) {
          subtask.title = title;
        }
        if (isCompleted !== undefined) {
          subtask.isCompleted = isCompleted;
        }
      }
    }
  }

  private createNewSubtask(title: string, em?: EntityManager) {
    const entityManager = this.ensureEntityManager(em);
    return entityManager.create(Subtask, {
      title,
      isCompleted: false,
    });
  }
}
