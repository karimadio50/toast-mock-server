import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString, MaxLength } from 'class-validator';

export class GetMenuItemsQueryDto {
  @ApiPropertyOptional({
    description: 'Optional ISO timestamp to fetch menu items modified since this value.',
    example: '2019-08-24T14:15:22Z',
  })
  @IsOptional()
  @IsDateString()
  lastModified?: string;

  @ApiPropertyOptional({
    description: 'Optional pagination token from previous response.',
    example: 'string',
  })
  @IsOptional()
  @IsString()
  @MaxLength(128)
  pageToken?: string;
}
