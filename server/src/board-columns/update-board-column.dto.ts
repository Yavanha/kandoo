import { PartialType } from '@nestjs/mapped-types';
import { CreateBoardColumnDto } from './create-board-column.dto';
import { IsOptional, IsUUID } from 'class-validator';

export class UpdateBoardColumnDto extends PartialType(CreateBoardColumnDto) {
  @IsUUID()
  @IsOptional()
  id: string;
}
