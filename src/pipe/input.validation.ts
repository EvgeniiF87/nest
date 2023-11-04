import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  ValidationError,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class InputValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;

    const object = plainToClass(metatype, value);

    if (object) {
      const errors: ValidationError[] = await validate(object);

      if (errors.length > 0) {
        const validationErrors = [];
        errors.map((err) => {
          const error = {
            field: err.property,
            validationError: Object.values(err.constraints),
          };

          validationErrors.push(error);
        });
        throw new BadRequestException(validationErrors);
      }
    }

    return value;
  }
}
