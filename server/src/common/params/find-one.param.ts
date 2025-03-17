import { IsNotEmpty, IsUUID } from 'class-validator';

export class FindOneParam {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
