import {
  ConflictException,
  Injectable,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { DataSource, EntityManager } from 'typeorm';
import { Task } from './entities/task.entity';
import { FindOneParam } from 'src/common/params/find-one.param';
import { SubtasksService } from 'src/subtasks/subtasks.service';
import { BoardColumn } from 'src/board-columns/board-column.entity';

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

  private async confirmTaskIntegrity(task: CreateTaskDto, column: BoardColumn, em?: EntityManager) {
    await this.validateUniqueTaskTitle(task.title, em);
    this.validateTaskStatus(task, column);
    if (task.subtasks) {
      this.subtasksService.ensureUniqueSubtaskTitle(task.subtasks, em);
    }
  }

  private validateTaskStatus(task : CreateTaskDto , column : BoardColumn) {

    if (task.status !== column.title) {
      throw new ConflictException(`Task status ${task.status} does not match column title ${column.title}`);
    }
  }

  private async validateUniqueTaskTitle(title: string, em?: EntityManager) {
    const entityManager = this.ensureEntityManager(em);
    const existingTask = await entityManager.findOne(Task, {
      where: { title },
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
