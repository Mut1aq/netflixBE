import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Model } from 'mongoose';
import { UserDocument } from 'src/modules/user/entities/user.entity';

/**
 * #### Custom Validator to check if the email exists or not
 */
@ValidatorConstraint({ name: 'UniqueEmail', async: true })
@Injectable()
export class CustomEmailConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
  ) {}

  async validate(
    value: string,
    validationArguments?: ValidationArguments,
  ): Promise<any> {
    const user = await this.userModel.findOne({
      email: value,
    });
    if (!user) {
      return true;
    }
    return false;
  }
}

export function UniqueEmail(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: CustomEmailConstraint,
    });
  };
}
