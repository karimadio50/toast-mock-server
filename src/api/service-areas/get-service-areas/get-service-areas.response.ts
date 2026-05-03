import { ApiProperty } from '@nestjs/swagger';

export class ServiceAreaRevenueCenterResponseDto {
  @ApiProperty({ example: 'clrevceast000000000000000001' })
  guid: string;

  @ApiProperty({ example: 'RevenueCenter' })
  entityType: string;

  @ApiProperty({ example: 'dc-oaks-east-rc-main' })
  externalId: string;
}

export class GetServiceAreasResponseDto {
  @ApiProperty({ example: 'saeastmaindining00000001' })
  guid: string;

  @ApiProperty({ example: 'ServiceArea' })
  entityType: string;

  @ApiProperty({ example: 'Main Dining' })
  name: string;

  @ApiProperty({ type: ServiceAreaRevenueCenterResponseDto })
  revenueCenter: ServiceAreaRevenueCenterResponseDto;
}
