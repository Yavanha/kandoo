import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateSubtasksDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;
}
