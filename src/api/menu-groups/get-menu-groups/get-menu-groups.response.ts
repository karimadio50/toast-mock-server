import { ApiProperty } from '@nestjs/swagger';

export class MenuEntityReferenceResponseDto {
  @ApiProperty({ example: 'meneastallday000000001' })
  guid: string;

  @ApiProperty({ example: 'Menu' })
  entityType: string;

  @ApiProperty({ example: 'east-all-day' })
  externalId: string;
}

export class MenuGroupImageResponseDto {
  @ApiProperty({ example: 'https://cdn.mock.toast/east/groups/mains.png' })
  url: string;
}

export class GetMenuGroupsResponseDto {
  @ApiProperty({ example: 'grpeastmains00000000001' })
  guid: string;

  @ApiProperty({ example: 'MenuGroup' })
  entityType: string;

  @ApiProperty({ example: 'east-mains' })
  externalId: string;

  @ApiProperty({ example: 'Mains' })
  name: string;

  @ApiProperty({ type: MenuEntityReferenceResponseDto })
  menu: MenuEntityReferenceResponseDto;

  @ApiProperty({ example: 'YES' })
  orderableOnline: string;

  @ApiProperty({ example: 'ALL' })
  visibility: string;

  @ApiProperty({ type: MenuEntityReferenceResponseDto })
  parent: MenuEntityReferenceResponseDto;

  @ApiProperty({ type: MenuEntityReferenceResponseDto, isArray: true })
  items: MenuEntityReferenceResponseDto[];

  @ApiProperty({ type: MenuEntityReferenceResponseDto, isArray: true })
  subgroups: MenuEntityReferenceResponseDto[];

  @ApiProperty({ type: MenuEntityReferenceResponseDto, isArray: true })
  optionGroups: MenuEntityReferenceResponseDto[];

  @ApiProperty({ example: true })
  inheritOptionGroups: boolean;

  @ApiProperty({ type: MenuGroupImageResponseDto, isArray: true })
  images: MenuGroupImageResponseDto[];

  @ApiProperty({ example: 'NONE' })
  unitOfMeasure: string;

  @ApiProperty({ example: true })
  inheritUnitOfMeasure: boolean;
}
