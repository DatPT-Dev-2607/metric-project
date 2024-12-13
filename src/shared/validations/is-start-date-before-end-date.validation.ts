import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsStartDateBeforeEndDateConstraint
  implements ValidatorConstraintInterface
{
  validate(endDate: Date, args: ValidationArguments): boolean {
    const object = args.object as Record<string, any>;

    const startDate = object['startDate'];

    return new Date(startDate).getTime() <= new Date(endDate).getTime();
  }

  defaultMessage(args: ValidationArguments): string {
    return `Start date (${args.value}) must be earlier than end date.`;
  }
}

export function IsStartDateBeforeEndDate(
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsStartDateBeforeEndDateConstraint,
    });
  };
}
