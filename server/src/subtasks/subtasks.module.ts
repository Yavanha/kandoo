import { Module } from '@nestjs/common';
import { SubtasksService } from './subtasks.service';
import { SubtasksController } from './subtasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subtask } from './subtask.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subtask])],
  controllers: [SubtasksController],
  providers: [SubtasksService],
})
export class SubtasksModule {}
