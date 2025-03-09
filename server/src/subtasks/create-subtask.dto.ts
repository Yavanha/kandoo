import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateSubtaskDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  title: string;
}
