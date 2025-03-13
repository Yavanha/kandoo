import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateBoardColumnDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  title: string;
}
