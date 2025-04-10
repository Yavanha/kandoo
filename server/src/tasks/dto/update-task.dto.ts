import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator';
import { UpdateSubtasksDto } from '../../subtasks/update-subtasks.dto';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsArray()
  subtasks?: UpdateSubtasksDto[];

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  removeSubtaskIds?: string[];
}
