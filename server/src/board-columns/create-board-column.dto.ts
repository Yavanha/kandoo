import { IsString } from 'class-validator';

export class CreateBoardColumnDto {
  @IsString()
  title: string;
}
