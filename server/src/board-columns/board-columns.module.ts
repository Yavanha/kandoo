import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardColumnsService } from './board-columns.service';
import { TasksModule } from 'src/tasks/tasks.module';
import { BoardColumnsController } from './board-columns.controller';
import { BoardColumn } from './board-column.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BoardColumn]), TasksModule],
  controllers: [BoardColumnsController],
  providers: [BoardColumnsService],
  exports: [BoardColumnsService],
})
export class BoardColumnsModule {}
