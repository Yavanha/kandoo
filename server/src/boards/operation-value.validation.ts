import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Operation } from './operations.dto';

@ValidatorConstraint({ name: 'ConditionalValueValidation', async: false })
export class ConditionalValueValidator implements ValidatorConstraintInterface {
  validate(
    value: string | { title: string },
    args: ValidationArguments,
  ): boolean {
    const obj = args.object as Operation; // Access the entire DTO object
    const path = obj.path;
    const op = obj.op;

    // If `op` is "remove", skip validation
    if (op === 'remove') {
      return typeof value === 'undefined';
    }

    // Validate based on `path`
    if (path === '/name') {
      return typeof value === 'string' && value.trim().length > 0;
    } else if (/^\/columns\/\d+$/.test(path)) {
      return (
        typeof value === 'object' &&
        value !== null &&
        typeof value.title === 'string' &&
        value.title.trim().length > 0
      );
    } else if (/^\/columns\/\d+\/title$/.test(path)) {
      return typeof value === 'string' && value.trim().length > 0;
    }

    // If none of the conditions match, validation fails
    return false;
  }

  defaultMessage(args: ValidationArguments): string {
    const obj = args.object as Operation;
    const path = obj.path;

    if (path === '/name') {
      return 'value must be a non-empty string for path "/name"';
    } else if (/^\/columns\/\d+$/.test(path)) {
      return 'value must be an object with a non-empty "title" property for path "/columns/{index}"';
    } else if (/^\/columns\/\d+\/title$/.test(path)) {
      return 'value must be a non-empty string for path "/columns/{index}/title"';
    }

    return 'Invalid value for the given path';
  }
}
