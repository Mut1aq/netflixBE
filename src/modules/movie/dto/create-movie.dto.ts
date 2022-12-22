import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateMovieDto {
  @ApiProperty({
    description: 'Movie name',
    example: 'titanic',
    name: 'name',
    required: true,
    type: 'string',
    minLength: 1,
    maxLength: 100,
  })
  @IsNotEmpty({
    message: i18nValidationMessage('auth.validation.isNotEmpty', {
      property: 'Name',
    }),
  })
  @IsString({
    message: i18nValidationMessage('auth.validation.isString', {
      property: 'Name',
    }),
  })
  @MinLength(1, {
    message: i18nValidationMessage('auth.validation.minLength', {
      property: 'Name',
      characters: 1,
    }),
  })
  @MaxLength(100, {
    message: i18nValidationMessage('auth.validation.maxLength', {
      property: 'Name',
      characters: 100,
    }),
  })
  name: string;

  //*******************************************/

  @ApiProperty({
    description: 'Movie Description',
    example: 'the ship sinks',
    name: 'description',
    required: true,
    type: 'string',
    minLength: 1,
    maxLength: 100,
  })
  @IsNotEmpty({
    message: i18nValidationMessage('auth.validation.isNotEmpty', {
      property: 'Description',
    }),
  })
  @IsString({
    message: i18nValidationMessage('auth.validation.isString', {
      property: 'description',
    }),
  })
  @MinLength(1, {
    message: i18nValidationMessage('auth.validation.minLength', {
      property: 'Description',
      characters: 1,
    }),
  })
  @MaxLength(2200, {
    message: i18nValidationMessage('auth.validation.maxLength', {
      property: 'Description',
      characters: 2200,
    }),
  })
  description: string;

  //*******************************************/

  @ApiProperty({
    description: 'Release Date',
    type: String,
    example: '12/12/2000',
    required: true,
  })
  @IsNotEmpty({
    message: i18nValidationMessage('auth.validation.isNotEmpty', {
      property: 'Release Date',
    }),
  })
  @Transform(({ value }) => new Date(value))
  @IsDate({
    message: i18nValidationMessage('auth.validation.date'),
  })
  releaseDate: string;
}
