import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateBoardDto } from './create-board.dto';
import { UpdateBoardColumnDto } from 'src/board-columns/update-board-column.dto';
import { ArrayUnique, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateBoardDto extends PartialType(
  OmitType(CreateBoardDto, ['columns'] as const),
) {
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateBoardColumnDto)
  @ArrayUnique((o: UpdateBoardColumnDto) => o.title)
  columns?: UpdateBoardColumnDto[];
}
