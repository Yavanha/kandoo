import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateBoardDto } from './create-board.dto';
import { UpdateBoardColumnDto } from 'src/board-columns/update-board-column.dto';
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateBoardDto extends PartialType(
  OmitType(CreateBoardDto, ['columns'] as const),
) {
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateBoardColumnDto)
  @ArrayUnique((o: UpdateBoardColumnDto) => o.title)
  @IsArray({ message: 'The input must be an array.' })
  @ArrayNotEmpty({ message: 'The array must not be empty.' })
  columns?: UpdateBoardColumnDto[];

  @IsOptional() // Makes the field optional
  @IsArray({ message: 'The input must be an array of UUIDs.' })
  @ArrayNotEmpty({ message: 'The array must not be empty.' })
  @IsUUID('4', {
    each: true,
    message: 'Each element in the array must be a valid UUID.',
  })
  removeColumnIds?: string[];
}
