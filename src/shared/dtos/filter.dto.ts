import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class FilterDto {
  @ApiProperty({
    description:
      'Skip for movies, skip=5 means 5 movies will be skipped, this is for pagination',
    name: 'skip',
    required: false,
    type: Number,
    minimum: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  skip: number;

  @ApiProperty({
    description:
      'Limit for movies, limit=5 means only 5 movies will be retrieved at a time, this is for pagination',
    name: 'limit',
    required: false,
    type: Number,
    minimum: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  limit: number;

  @ApiProperty({
    description: 'Order by date, for filtering, can be either "asc", "desc"',
    name: 'orderByDate',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  orderByDate: string;

  @ApiProperty({
    description: 'Order by rate, for filtering, can be either "asc", "desc"',
    name: 'orderByRate',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  orderByRate: string;
}
