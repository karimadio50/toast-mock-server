import { ApiProperty } from '@nestjs/swagger';

export class RestaurantLocationDto {
  @ApiProperty()
  address1: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  postalCode: string;

  @ApiProperty()
  country: string;
}

export class GetRestaurantDetailsResponseDto {
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

  @ApiProperty({ example: 'clrestoakseast0000000000001' })
  guid: string;

  @ApiProperty({ example: 'dc-oaks-east' })
  externalId: string;

  @ApiProperty({ example: 'DC Oaks East' })
  name: string;

  @ApiProperty({ example: 'America/New_York' })
  timezone: string;

  @ApiProperty({ example: 'USD' })
  currency: string;

  @ApiProperty({ type: RestaurantLocationDto })
  location: RestaurantLocationDto;

  @ApiProperty({ example: '555-0123' })
  phone: string;
}
