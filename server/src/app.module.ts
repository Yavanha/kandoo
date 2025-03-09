import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import DATABASE_CONFIG from './config/database.config';
import VALIDATION_SCHEMA from './config/validation-schema.config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppConfiguration } from './config/app-config.type';
import { SubtasksModule } from './subtasks/subtasks.module';
import { TasksModule } from './tasks/tasks.module';
import { BoardsModule } from './boards/boards.module';
import { Subtask } from './subtasks/subtask.entity';
import { Task } from './tasks/entities/task.entity';
import { Board } from './boards/board.entity';
import { BoardColumn } from './board-columns/board-column.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<AppConfiguration>) => {
        return {
          ...configService.get<TypeOrmModuleOptions>('database'),
          entities: [Subtask, Task, Board, BoardColumn],
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      load: [DATABASE_CONFIG],
      validationSchema: VALIDATION_SCHEMA,
      validationOptions: {
        abortEarly: true,
      },
    }),
    SubtasksModule,
    TasksModule,
    BoardsModule,
  ],
})
export class AppModule {}
