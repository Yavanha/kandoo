import { ConflictException, Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { BoardColumn } from './board-column.entity';
import { CreateBoardColumnDto } from './create-board-column.dto';
import { UpdateBoardColumnDto } from './update-board-column.dto';

@Injectable()
export class BoardColumnsService {
  constructor(private dataSource: DataSource) {}

  createBoardColumn() {
    console.log('Creating a new board column...');
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
    removeColumnIds: string[] | undefined,
    updateBoardColumns: UpdateBoardColumnDto[] | undefined,
    boardId: string,
    manager?: EntityManager,
  ) {
    let boardColumns = await this.retrieveBoardColumnsFromBoard(
      boardId,
      manager,
    );
    if (!removeColumnIds && !updateBoardColumns) {
      return boardColumns;
    }

    if (removeColumnIds) {
      boardColumns = await this.removeBoardColumns(
        removeColumnIds,
        boardColumns,
        manager,
      );
    }

    if (updateBoardColumns) {
      boardColumns = this.refreshBoardColumns(
        updateBoardColumns,
        boardColumns,
        manager,
      );
      this.ensureUniqueColumnTitles(boardColumns);
    }
    return boardColumns;
  }

  private async removeBoardColumns(
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

  private refreshBoardColumns(
    updateBoardColumnsDto: UpdateBoardColumnDto[],
    existingBoardColumn: BoardColumn[],
    em?: EntityManager,
  ) {
    const columnMap = this.transformBoardColumnsToMap(existingBoardColumn);
    const newColumns: BoardColumn[] = [];
    for (const column of updateBoardColumnsDto) {
      const { id, title } = column;
      this.remameExistingBoardColumns(column, columnMap);
      if (!id && title) {
        const newColumn = this.createNewBoardColumn(title, em);
        newColumns.push(newColumn);
      }
    }
    newColumns.unshift(...columnMap.values());
    return newColumns;
  }

  private transformBoardColumnsToMap(columns: BoardColumn[]) {
    return new Map<string, BoardColumn>(
      columns.map((column) => [column.id, column]),
    );
  }

  private async retrieveBoardColumnsFromBoard(
    boardId: string,
    manager?: EntityManager,
  ) {
    const entityManager = this.ensureEntityManager(manager);
    return await entityManager.find(BoardColumn, {
      where: { boardId },
    });
  }

  private remameExistingBoardColumns(
    data: UpdateBoardColumnDto,
    boardColumnsMap: Map<string, BoardColumn>,
  ) {
    const { id, title } = data;
    if (id) {
      const column = boardColumnsMap.get(id);
      if (column) {
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
