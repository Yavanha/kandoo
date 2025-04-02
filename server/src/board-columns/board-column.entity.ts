import { Board } from 'src/boards/board.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Task } from 'src/tasks/entities/task.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Unique,
} from 'typeorm';

@Entity('kandoo_board_columns')
@Unique(['title', 'boardId'])
export class BoardColumn extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  title: string;

  @Column()
  @Index()
  boardId: string;

  @ManyToOne(() => Board, (board) => board.columns, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'boardId' })
  board: Board;

  @OneToMany(() => Task, (Task) => Task.column)
  tasks: Task[];
}
