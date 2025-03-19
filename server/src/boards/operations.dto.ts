import { IsString, IsNotEmpty, IsIn, Matches, Validate } from 'class-validator';
import { ConditionalValueValidator } from './operation-value.validation';

const operations = ['add', 'test', 'replace', 'remove'] as const;
export type AllowedOperation = (typeof operations)[number];
class TitleObject {
  @IsString()
  @IsNotEmpty()
  title: string;
}

export class Operation {
  @IsString()
  @IsIn(operations)
  @IsNotEmpty()
  op: AllowedOperation;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\/name$|^\/columns\/\d+$|^\/columns\/\d+\/title$/, {
    message:
      'path must be either "/name", "/columns/{index}", or "/columns/{index}/title"',
  })
  path: string;

  @Validate(ConditionalValueValidator, {
    message: 'Invalid value for the given path and operation',
  })
  value: string | TitleObject;
}
