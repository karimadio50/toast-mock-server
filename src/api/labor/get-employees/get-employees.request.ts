import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class GetEmployeesQueryDto {
  @ApiPropertyOptional({
    description: 'An optional array of one or more employee identifiers, either the Toast platform GUID or an external identifier.',
    type: [String],
    example: ['east-emp-1'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  employeeIds?: string[];
}
