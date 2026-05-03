import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class GetJobsQueryDto {
  @ApiPropertyOptional({
    description: 'An optional array of one or more job identifiers, either the Toast platform GUID or an external identifier assigned by the client.',
    type: [String],
    example: ['east-cook'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  jobIds?: string[];
}
