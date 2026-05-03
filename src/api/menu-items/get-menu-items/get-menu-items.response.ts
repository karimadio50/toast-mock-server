import { ApiProperty } from '@nestjs/swagger';

export class MenuItemReferenceResponseDto {
  @ApiProperty({ example: 'mgeastburgeraddons000001' })
  guid: string;

  @ApiProperty({ example: 'MenuOptionGroup' })
  entityType: string;

  @ApiProperty({ example: 'east-burger-addons' })
  externalId: string;
}

export class ImageResponseDto {
  @ApiProperty({ example: 'https://cdn.mock.toast/east/classic-burger.png' })
  url: string;
}

export class GetMenuItemsResponseDto {
  @ApiProperty({ example: 'itmeastclassicburger0001' })
  guid: string;

  @ApiProperty({ example: 'MenuItem' })
  entityType: string;

  @ApiProperty({ example: 'east-classic-burger' })
  externalId: string;

  @ApiProperty({ example: 'Classic Burger' })
  name: string;

  @ApiProperty({ example: 0 })
  calories: number;

  @ApiProperty({ example: 'EAST-BURGER-001' })
  sku: string;

  @ApiProperty({ example: '1001' })
  plu: string;

  @ApiProperty({ example: 'YES' })
  orderableOnline: string;

  @ApiProperty({ example: 'ALL' })
  visibility: string;

  @ApiProperty({ example: 'NONE' })
  type: string;

  @ApiProperty({ type: MenuItemReferenceResponseDto, isArray: true })
  optionGroups: MenuItemReferenceResponseDto[];

  @ApiProperty({ example: true })
  inheritOptionGroups: boolean;

  @ApiProperty({ type: ImageResponseDto, isArray: true })
  images: ImageResponseDto[];

  @ApiProperty({ example: 'NONE' })
  unitOfMeasure: string;

  @ApiProperty({ example: true })
  inheritUnitOfMeasure: boolean;
}
