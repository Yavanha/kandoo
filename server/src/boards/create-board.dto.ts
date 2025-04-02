import { Type } from 'class-transformer';
import {
  ArrayUnique,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { CreateBoardColumnDto } from 'src/board-columns/create-board-column.dto';

export class CreateBoardDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  name: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateBoardColumnDto)
  @ArrayUnique((o: CreateBoardColumnDto) => o.title)
  columns?: CreateBoardColumnDto[];
}
