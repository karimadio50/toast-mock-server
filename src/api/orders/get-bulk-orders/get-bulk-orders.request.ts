import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class GetBulkOrdersQueryDto {
  @ApiPropertyOptional({
    description: 'The inclusive start date and time. (ISO-8601)',
    example: '2024-01-01T00:00:00.000+0000',
  })
  @IsOptional()
  @IsString()
  startDate?: string;

  @ApiPropertyOptional({
    description: 'The exclusive end date and time. (ISO-8601)',
    example: '2024-01-02T00:00:00.000+0000',
  })
  @IsOptional()
  @IsString()
  endDate?: string;

  @ApiPropertyOptional({
    description: 'The business date in yyyymmdd format.',
    example: '20240101',
  })
  @IsOptional()
  @IsString()
  businessDate?: string;

  @ApiPropertyOptional({
    description: 'The page number to return.',
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'The number of orders to return per page (max 100).',
    default: 100,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  pageSize?: number = 100;
}
