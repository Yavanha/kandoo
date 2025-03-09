import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateBoardDto } from './create-board.dto';
import { UpdateBoardColumnDto } from 'src/board-columns/update-board-column.dto';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateBoardDto extends PartialType(
  OmitType(CreateBoardDto, ['columns'] as const),
) {
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateBoardColumnDto)
  columns?: UpdateBoardColumnDto[];
}
