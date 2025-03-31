import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardColumnsService } from './board-columns.service';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [],
  providers: [BoardColumnsService],
  exports: [BoardColumnsService],
})
export class BoardColumnsModule {}
