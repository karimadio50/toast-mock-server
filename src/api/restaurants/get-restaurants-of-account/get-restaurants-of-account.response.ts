import { ApiProperty } from '@nestjs/swagger';

export class GetRestaurantsOfAccountResponseDto {
  @ApiProperty({ example: 'clrestoakseast0000000000001' })
  restaurantGuid: string;

  @ApiProperty({ example: 'clmgdcaccount0000000000001' })
  managementGroupGuid: string;

  @ApiProperty({ example: false })
  deleted: boolean;

  @ApiProperty({ example: 'DC Oaks East' })
  restaurantName: string;

  @ApiProperty({ example: '101 East Oak Street' })
  locationName: string;

  @ApiProperty({ example: 'ops@dcoaks.com' })
  createdByEmailAddress: string;

  @ApiProperty({ example: 'dc-main-account' })
  externalGroupRef: string;

  @ApiProperty({ example: 'dc-oaks-east' })
  externalRestaurantRef: string;

  @ApiProperty({ example: 1767000000000 })
  modifiedDate: number;

  @ApiProperty({ example: 1766000000000 })
  createdDate: number;

  @ApiProperty({ example: '2026-12-29T10:40:00.000Z' })
  isoModifiedDate: string;

  @ApiProperty({ example: '2026-12-17T20:53:20.000Z' })
  isoCreatedDate: string;
}
