import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import mongoose from 'mongoose';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateReviewDto {
  @ApiProperty({
    description: 'Review Test for the movie',
    example: 'titanic was a great movie, i enjoyed it',
    name: 'reviewText',
    required: false,
    type: 'string',
    minLength: 1,
    maxLength: 100,
  })
  @IsOptional()
  @IsString({
    message: i18nValidationMessage('auth.validation.isString', {
      property: 'Review Text',
    }),
  })
  @MinLength(1, {
    message: i18nValidationMessage('auth.validation.minLength', {
      property: 'Review Text',
      characters: 1,
    }),
  })
  @MaxLength(100, {
    message: i18nValidationMessage('auth.validation.maxLength', {
      property: 'Review Text',
      characters: 100,
    }),
  })
  reviewText?: string;

  @ApiProperty({
    description: 'Rate from 1 to 5',
    example: '5',
    name: 'rate',
    minimum: 1,
    maximum: 5,
    required: true,
    type: 'integer',
  })
  @IsNotEmpty({
    message: i18nValidationMessage('auth.validation.isNotEmpty', {
      property: 'Rate',
    }),
  })
  @Transform((param) => parseInt(param.value))
  @IsInt({
    message: i18nValidationMessage('auth.validation.isInt', {
      property: 'Rate',
    }),
  })
  @Min(1, {
    message: i18nValidationMessage('auth.validation.min', {
      property: 'Rate',
      min: 1,
    }),
  })
  @Max(5, {
    message: i18nValidationMessage('auth.validation.max', {
      property: 'Rate',
      max: 5,
    }),
  })
  rate: number;
}
