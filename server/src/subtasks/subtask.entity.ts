import { Column, Entity, ManyToOne, JoinColumn, Index, Unique } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';
import { Task } from '../tasks/entities/task.entity';

@Entity('kandoo_subtasks')
@Unique(['title', 'taskId'])
export class Subtask extends BaseEntity {
  @Column({ type: 'varchar', length: 50, nullable: false })
  title: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  isCompleted: boolean;

  @Column()
  @Index()
  taskId: string;

  @ManyToOne(() => Task, (task) => task.subtasks, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'taskId' })
  task: Task;
}
