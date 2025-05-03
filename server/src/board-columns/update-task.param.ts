import { IsNotEmpty, IsUUID } from 'class-validator';
import { FindOneParam } from 'src/common/params/find-one.param';

export class UpdateTaskParam extends FindOneParam {
  @IsNotEmpty()
  @IsUUID()
  taskId: string;
}
