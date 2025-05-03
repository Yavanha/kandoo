import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { BoardColumn } from './board-column.entity';
import { CreateBoardColumnDto } from './create-board-column.dto';
import { UpdateBoardColumnDto } from './update-board-column.dto';
import { TasksService } from 'src/tasks/tasks.service';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { UpdateTaskDto } from 'src/tasks/dto/update-task.dto';

@Injectable()
export class BoardColumnsService {
  constructor(
    private dataSource: DataSource,
    private tasksService: TasksService,
  ) {}

  async findAll() {
    return this.dataSource.manager.find(BoardColumn);
  }

  async findAllTasksByColumnId(columnId: string) {
    return await this.tasksService.findAllTasksByColumnId(columnId);
  }

  async findOne(id: string) {
    return this.dataSource.manager.findOne(BoardColumn, { where: { id } });
  }

  async addColumnToBoard(
    boardId: string,
    createBoardColumnDto: CreateBoardColumnDto,
  ) {
    const { title } = createBoardColumnDto;
    await this.validateUniqueBoardColumnTitle(boardId, title);
    const newBoardColumn = this.dataSource.manager.create(BoardColumn, {
      ...createBoardColumnDto,
      boardId,
    });
    return await this.dataSource.manager.save(newBoardColumn);
  }

  public async update(
    boardId: string,
    removeColumnIds: string[] | undefined,
    updateBoardColumns: UpdateBoardColumnDto[] | undefined,
    manager?: EntityManager,
  ) {
    let boardColumns = await this.findBoardColumnsWithBoardId(boardId, manager);
    boardColumns = await this.deleteBoardColumnsByIds(
      removeColumnIds,
      boardColumns,
      manager,
    );
    boardColumns = await this.updateBoardColumns(
      updateBoardColumns,
      boardColumns,
      manager,
    );
    return boardColumns;
  }

  private async findBoardColumnsWithBoardId(
    boardId: string,
    manager?: EntityManager,
  ) {
    const entityManager = this.ensureEntityManager(manager);
    return await entityManager.find(BoardColumn, {
      where: { boardId },
    });
  }

  private async deleteBoardColumnsByIds(
    ids: string[] | undefined,
    existingBoardColumn: BoardColumn[],
    em?: EntityManager,
  ) {
    if (ids) {
      const entityManager = this.ensureEntityManager(em);
      await entityManager.delete(BoardColumn, ids);
      return existingBoardColumn.filter((column) => !ids.includes(column.id));
    }
    return existingBoardColumn;
  }

  private async updateBoardColumns(
    updateBoardColumnsDto: UpdateBoardColumnDto[] | undefined,
    existingBoardColumns: BoardColumn[],
    em?: EntityManager,
  ) {
    if (!updateBoardColumnsDto) {
      return existingBoardColumns;
    }
    const columnMap = this.transformBoardColumnsToMap(existingBoardColumns);
    const newColumns: BoardColumn[] = [];
    const entityManager = this.ensureEntityManager(em);
    for (const column of updateBoardColumnsDto) {
      const { id, title } = column;
      await this.swapTitleHandler(
        title,
        updateBoardColumnsDto,
        existingBoardColumns,
        entityManager,
      );

      this.remameExistingBoardColumns(column, columnMap);
      if (!id && title) {
        const newColumn = this.createNewBoardColumn(title, em);
        newColumns.push(newColumn);
      }
    }
    newColumns.unshift(...columnMap.values());
    return newColumns;
  }

  public async addTaskToColumn(columnId: string, createTaskDto: CreateTaskDto) {
    const column = await this.tryToRetrieveColumnById(columnId);
    return await this.tasksService.addTaskToColumn(column, createTaskDto);
  }

  public async updateTask(
    columnId: string,
    taskId: string,
    updateTaskDto: UpdateTaskDto,
  ) {
    await this.tryToRetrieveColumnById(columnId);
    return this.tasksService.update(taskId, updateTaskDto);
  }

  private async tryToRetrieveColumnById(id: string, em?: EntityManager) {
    const entityManager = this.ensureEntityManager(em);
    const column = await entityManager.findOne(BoardColumn, { where: { id } });
    if (!column) {
      throw new NotFoundException(`Column with id ${id} not found`);
    }
    return column;
  }

  private async swapTitleHandler(
    updateBoardColumnTitle: string | undefined,
    updateBoardColumnsDtos: UpdateBoardColumnDto[],
    existingBoardColumns: BoardColumn[],
    em?: EntityManager,
  ) {
    if (!updateBoardColumnTitle) {
      return;
    }
    const entityManager = this.ensureEntityManager(em);
    const existingColum = existingBoardColumns.find(
      ({ title }) => title === updateBoardColumnTitle,
    );

    if (existingColum) {
      const existingColumWillUpdate = updateBoardColumnsDtos.find(
        ({ id }) => id === existingColum.id,
      );
      if (!existingColumWillUpdate) {
        throw new ConflictException(
          `Board Column with the title ${updateBoardColumnTitle} already exists in the board`,
        );
      }
      existingColum.title = `${updateBoardColumnTitle}-temp-data`;
      await entityManager.save(BoardColumn, existingColum);
    }
  }

  private transformBoardColumnsToMap(columns: BoardColumn[]) {
    return new Map<string, BoardColumn>(
      columns.map((column) => [column.id, column]),
    );
  }

  private remameExistingBoardColumns(
    data: UpdateBoardColumnDto,
    boardColumnsMap: Map<string, BoardColumn>,
  ) {
    const { id, title } = data;
    if (id) {
      const column = boardColumnsMap.get(id);
      if (column && title) {
        column.title = title;
      }
    }
  }

  private createNewBoardColumn(title: string, em?: EntityManager) {
    const entityManager = this.ensureEntityManager(em);
    return entityManager.create(BoardColumn, {
      title,
    });
  }
  private async validateUniqueBoardColumnTitle(
    boardId: string,
    title: string,
    em?: EntityManager,
  ) {
    const entityManager = this.ensureEntityManager(em);
    const existingBoardColumn = await entityManager.findOne(BoardColumn, {
      where: { title, boardId },
    });
    if (existingBoardColumn) {
      throw new ConflictException(
        `Board Column with the title ${title} already exists in the board`,
      );
    }
  }

  public ensureUniqueColumnTitles(
    columns: (BoardColumn | CreateBoardColumnDto)[],
  ) {
    const uniqueColumnTitle = new Set(columns.map(({ title }) => title));
    if (uniqueColumnTitle.size < columns.length) {
      throw new ConflictException(
        'All Column Names must be unique, please provide unique names',
      );
    }
  }

  private ensureEntityManager(em?: EntityManager) {
    return em || this.dataSource.manager;
  }
}
