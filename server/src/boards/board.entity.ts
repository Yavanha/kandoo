import { BoardColumn } from 'src/board-columns/board-column.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('kandoo_boards')
export class Board extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
    unique: true,
  })
  name: string;

  @OneToMany(() => BoardColumn, (boardColumn) => boardColumn.board, {
    cascade: true,
    eager: true,
  })
  columns: BoardColumn[];
}
