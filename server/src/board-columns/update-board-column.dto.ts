import { CreateBoardColumnDto } from './create-board-column.dto';
import { IsOptional, IsUUID } from 'class-validator';

export class UpdateBoardColumnDto extends CreateBoardColumnDto {
  @IsUUID()
  @IsOptional()
  id?: string;
}
