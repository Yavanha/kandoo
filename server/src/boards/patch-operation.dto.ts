import { Type } from 'class-transformer';
import { ArrayNotEmpty, ValidateNested } from 'class-validator';
import { Operation } from './operations.dto';

export class PatchOperationDto {
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  @Type(() => Operation)
  operations: Array<Operation>;
}
