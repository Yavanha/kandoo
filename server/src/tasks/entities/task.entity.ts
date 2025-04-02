import { BoardColumn } from 'src/board-columns/board-column.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Subtask } from 'src/subtasks/subtask.entity';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  Unique,
  JoinColumn,
} from 'typeorm';

@Entity('kandoo_tasks')
@Unique(['title', 'columnId'])
export class Task extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'text',
    nullable: true,
    default: '',
  })
  description: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  status: string;

  @Column()
  @Index()
  columnId: string;

  @ManyToOne(() => BoardColumn, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'columnId' })
  column: BoardColumn;

  @OneToMany(() => Subtask, (subtask) => subtask.task, {
    cascade: true,
  })
  subtasks: Subtask[];
}
