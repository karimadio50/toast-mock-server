import { ApiProperty } from '@nestjs/swagger';

export class MenuReferenceResponseDto {
  @ApiProperty({ example: 'grpeastmains00000000001' })
  guid: string;

  @ApiProperty({ example: 'MenuGroup' })
  entityType: string;

  @ApiProperty({ example: 'east-mains' })
  externalId: string;
}

export class MenuImageResponseDto {
  @ApiProperty({ example: 'https://cdn.mock.toast/east/menus/all-day.png' })
  url: string;
}

export class GetMenusResponseDto {
  @ApiProperty({ example: 'meneastallday000000001' })
  guid: string;

  @ApiProperty({ example: 'Menu' })
  entityType: string;

  @ApiProperty({ example: 'east-all-day' })
  externalId: string;

  @ApiProperty({ example: 'All Day Menu' })
  name: string;

  @ApiProperty({ example: 'YES' })
  orderableOnline: string;

  @ApiProperty({ example: 'ALL' })
  visibility: string;

  @ApiProperty({ type: MenuReferenceResponseDto, isArray: true })
  groups: MenuReferenceResponseDto[];

  @ApiProperty({ type: MenuImageResponseDto, isArray: true })
  images: MenuImageResponseDto[];

  @ApiProperty({ example: 'NONE' })
  unitOfMeasure: string;
}
