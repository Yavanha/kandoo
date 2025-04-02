import { Type } from 'class-transformer';
import {
  IsString,
  IsArray,
  ValidateNested,
  IsNotEmpty,
  MaxLength,
  ArrayNotEmpty,
} from 'class-validator';
import { CreateSubtaskDto } from 'src/subtasks/create-subtask.dto';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  title: string;

  @IsString()
  @MaxLength(500)
  description: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayNotEmpty({
    message: 'Subtasks cannot be empty',
  })
  @Type(() => CreateSubtaskDto)
  subtasks: CreateSubtaskDto[];
}
