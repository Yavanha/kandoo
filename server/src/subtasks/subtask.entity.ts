import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';

@Entity('kandoo_subtasks')
export class Subtask extends BaseEntity {
  @Column({ type: 'varchar', length: 50, nullable: false })
  title: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  isCompleted: boolean;
}
