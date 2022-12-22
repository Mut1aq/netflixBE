import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

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
  orderByDate: string;

  @IsOptional()
  @IsString()
  orderByRate: string;
}
