import { BaseEntity } from 'src/common/entities/base.entity';
import { Entity } from 'typeorm';

@Entity('kandoo_tasks')
export class Task extends BaseEntity {}
