import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class FilterDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  skip: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  limit: number;

  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  orderByDate: string;

  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  orderByRate: string;
}
