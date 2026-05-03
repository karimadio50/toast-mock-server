import { ApiProperty } from '@nestjs/swagger';

export class ConnectedRestaurantItemDto {
  @ApiProperty({ example: '7ab295f6-8dc8-4cb6-8cdb-072b83e84184' })
  restaurantGuid: string;

  @ApiProperty({ example: '75063706-dd6e-4da6-8bb6-3a99e218e686' })
  managementGroupGuid: string;

  @ApiProperty({ example: 'Main Street Cafe' })
  restaurantName: string;

  @ApiProperty({ example: '123 Main Street' })
  locationName: string;

  @ApiProperty({ example: 'clefebvre@mainstreetcafe.com' })
  createdByEmailAddress: string;

  @ApiProperty({ example: '' })
  externalGroupRef: string;

  @ApiProperty({ example: '' })
  externalRestaurantRef: string;

  @ApiProperty({ example: 1678823073353 })
  modifiedDate: number;

  @ApiProperty({ example: 1678823073353 })
  createdDate: number;

  @ApiProperty({ example: '2023-03-14T19:44:33.353Z' })
  isoModifiedDate: string;

  @ApiProperty({ example: '2023-03-14T19:44:33.353Z' })
  isoCreatedDate: string;
}

export class GetConnectedRestaurantsResponseDto {
  @ApiProperty({ example: 1 })
  currentPageNum: number;

  @ApiProperty({ type: ConnectedRestaurantItemDto, isArray: true })
  results: ConnectedRestaurantItemDto[];

  @ApiProperty({ example: 3222 })
  totalResultCount: number;

  @ApiProperty({ example: 1 })
  pageSize: number;

  @ApiProperty({ example: 'cDoxLHM6MQ==' })
  currentPageToken: string;

  @ApiProperty({ example: 'cDoyLHM6MQ==' })
  nextPageToken: string;

  @ApiProperty({ example: 3222 })
  totalCount: number;

  @ApiProperty({ example: 2 })
  nextPageNum: number;

  @ApiProperty({ example: 3222 })
  lastPageNum: number;
}
