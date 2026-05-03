import { ApiProperty } from '@nestjs/swagger';

export class TableServiceAreaResponseDto {
  @ApiProperty({ example: 'saeastmaindining00000001' })
  guid: string;

  @ApiProperty({ example: 'ServiceArea' })
  entityType: string;
}

export class TableRevenueCenterResponseDto {
  @ApiProperty({ example: 'clrevceast000000000000000001' })
  guid: string;

  @ApiProperty({ example: 'RevenueCenter' })
  entityType: string;

  @ApiProperty({ example: 'dc-oaks-east-rc-main' })
  externalId: string;
}

export class GetTablesResponseDto {
  @ApiProperty({ example: 'tbleasttableone000000001' })
  guid: string;

  @ApiProperty({ example: 'Table' })
  entityType: string;

  @ApiProperty({ example: 'T1' })
  name: string;

  @ApiProperty({ type: TableServiceAreaResponseDto })
  serviceArea: TableServiceAreaResponseDto;

  @ApiProperty({ type: TableRevenueCenterResponseDto })
  revenueCenter: TableRevenueCenterResponseDto;
}
