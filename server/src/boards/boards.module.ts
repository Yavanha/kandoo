import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { BoardColumn } from 'src/board-columns/board-column.entity';
import { BoardColumnsModule } from 'src/board-columns/board-columns.module';

@Module({
  imports: [TypeOrmModule.forFeature([Board, BoardColumn]), BoardColumnsModule],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
