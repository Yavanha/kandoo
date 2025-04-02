import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardColumnsService } from './board-columns.service';
import { TasksModule } from 'src/tasks/tasks.module';
import { BoardColumnsController } from './board-columns.controller';

@Module({
  imports: [TypeOrmModule.forFeature([]), TasksModule],
  controllers: [BoardColumnsController],
  providers: [BoardColumnsService],
  exports: [BoardColumnsService],
})
export class BoardColumnsModule {}
