import { Board } from 'src/boards/board.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, Index, ManyToOne, Unique } from 'typeorm';

@Entity('kandoo_board_columns')
@Unique(['title', 'boardId'])
export class BoardColumn extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 50,
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
  board: Board;
}
