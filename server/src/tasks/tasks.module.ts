import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubtasksModule } from 'src/subtasks/subtasks.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), SubtasksModule],
  controllers: [],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
