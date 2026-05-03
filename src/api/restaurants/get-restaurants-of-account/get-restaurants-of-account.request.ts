import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

// Skeleton file for get-restaurants-of-account request DTOs.

export class GetRestaurantsOfAccountQueryDto {
  @ApiPropertyOptional({
    description: 'External account ID used to validate account scope.',
    example: 'dc-main-account',
  })
  @IsOptional()
  @IsString()
  @MaxLength(128)
  accountExternalId?: string;

  @ApiPropertyOptional({
    description: 'Optional restaurant external ID filter.',
    example: 'dc-oaks-east',
  })
  @IsOptional()
  @IsString()
  @MaxLength(128)
  restaurantExternalId?: string;
}
