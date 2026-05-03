import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class GetShiftsQueryDto {
  @ApiPropertyOptional({
    description: 'An optional identifier that filters return values for a specific shift.',
    type: [String],
    example: ['east-shift-1'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  shiftIds?: string[];

  @ApiPropertyOptional({ example: '2019-08-24T14:15:22Z' })
  @IsOptional()
  @IsString()
  startDate?: string;

  @ApiPropertyOptional({ example: '2019-08-24T14:15:22Z' })
  @IsOptional()
  @IsString()
  endDate?: string;

  @ApiPropertyOptional({ example: '2019-08-24T14:15:22Z' })
  @IsOptional()
  @IsString()
  inDate?: string;

  @ApiPropertyOptional({ example: '2019-08-24T14:15:22Z' })
  @IsOptional()
  @IsString()
  outDate?: string;
}
