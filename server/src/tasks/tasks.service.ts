import {
  ConflictException,
  Injectable,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { DataSource, EntityManager } from 'typeorm';
import { Task } from './entities/task.entity';
import { FindOneParam } from 'src/common/params/find-one.param';
import { SubtasksService } from 'src/subtasks/subtasks.service';
import { BoardColumn } from 'src/board-columns/board-column.entity';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    private readonly datasource: DataSource,
    private readonly subtasksService: SubtasksService,
  ) {}

  async findAllTasksByColumnId(columnId: string) {
    return await this.datasource.manager.find(Task, {
      where: { columnId },
    });
  }

  async findOne(@Param() { id }: FindOneParam) {
    return await this.tryToRetrieveTaskById(id);
  }

  async addTaskToColumn(column: BoardColumn, createTaskDto: CreateTaskDto) {
    await this.confirmTaskIntegrity(createTaskDto, column);
    return await this.datasource.manager.save(Task, {
      ...createTaskDto,
      columnId: column.id,
    });
  }

  async remove(@Param() { id }: FindOneParam) {
    await this.tryToRetrieveTaskById(id);
    await this.datasource.manager.delete(Task, id);
  }

  async update(taskId: string, updateTaskDto: UpdateTaskDto) {
    const {
      title: updateTaskTitle,
      description: updateTaskDescription,
      status: updateTaskStatus,
      subtasks: updateSubtasks,
      removeSubtaskIds,
    } = updateTaskDto;

    if (
      !updateTaskTitle &&
      !updateTaskDescription &&
      !updateTaskStatus &&
      !updateSubtasks &&
      !removeSubtaskIds
    ) {
      return await this.tryToRetrieveTaskById(taskId);
    }

    return await this.datasource.transaction(async (manager) => {
      const task = await this.tryToRetrieveTaskById(taskId, manager);

      if (updateTaskTitle && updateTaskTitle !== task.title) {
        await this.validateUniqueTaskTitle(
          updateTaskTitle,
          task.columnId,
          manager,
        );
        task.title = updateTaskTitle;
      }

      if (updateTaskDescription !== undefined) {
        task.description = updateTaskDescription;
      }

      if (updateTaskStatus && updateTaskStatus !== task.status) {
        await this.validateTaskStatusChange(task, updateTaskStatus, manager);
        task.status = updateTaskStatus;
      }

      if (updateSubtasks || removeSubtaskIds) {
        task.subtasks = await this.subtasksService.applySubtaskChanges(
          taskId,
          removeSubtaskIds,
          updateSubtasks,
          manager,
        );
      }

      return await manager.save(Task, task);
    });
  }

  private async confirmTaskIntegrity(
    task: CreateTaskDto,
    column: BoardColumn,
    em?: EntityManager,
  ) {
    await this.validateUniqueTaskTitle(task.title, column.id, em);
    this.validateTaskStatus(task, column);
    if (task.subtasks) {
      this.subtasksService.ensureUniqueSubtaskTitle(task.subtasks);
    }
  }

  private validateTaskStatus(task: CreateTaskDto, column: BoardColumn) {
    if (task.status !== column.title) {
      throw new ConflictException(
        `Task status ${task.status} does not match column title ${column.title}`,
      );
    }
  }

  private async validateTaskStatusChange(
    task: Task,
    newStatus: string,
    em?: EntityManager,
  ) {
    const entityManager = this.ensureEntityManager(em);
    const columnExists = await entityManager.findOne(BoardColumn, {
      where: { title: newStatus, boardId: task.column?.boardId },
    });

    if (!columnExists) {
      throw new ConflictException(
        `Cannot change status to ${newStatus}. No matching column found.`,
      );
    }
    if (columnExists.id === task.columnId) {
      return;
    }
    task.columnId = columnExists.id;
  }

  private async validateUniqueTaskTitle(
    title: string,
    columnId: string,
    em?: EntityManager,
  ) {
    const entityManager = this.ensureEntityManager(em);
    const existingTask = await entityManager.findOne(Task, {
      where: { title, columnId },
    });
    if (existingTask) {
      throw new ConflictException(`Task with title ${title} already exists`);
    }
  }

  private async tryToRetrieveTaskById(id: string, em?: EntityManager) {
    const entityManager = this.ensureEntityManager(em);
    const task = await entityManager.findOne(Task, {
      where: { id },
      relations: ['subtasks'],
    });
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  private ensureEntityManager(em?: EntityManager) {
    return em || this.datasource.manager;
  }
}
