import { ApiProperty } from '@nestjs/swagger';

export class MenuOptionReferenceResponseDto {
  @ApiProperty({ example: 'modeastcheese00000000001' })
  guid: string;

  @ApiProperty({ example: 'MenuOption' })
  entityType: string;

  @ApiProperty({ example: 'east-cheese' })
  externalId: string;
}

export class GetModifierGroupsResponseDto {
  @ApiProperty({ example: 'mgeastburgeraddons000001' })
  guid: string;

  @ApiProperty({ example: 'MenuOptionGroup' })
  entityType: string;

  @ApiProperty({ example: 'east-burger-addons' })
  externalId: string;

  @ApiProperty({ example: 'Burger Add-ons' })
  name: string;

  @ApiProperty({ example: 0 })
  minSelections: number;

  @ApiProperty({ example: 3 })
  maxSelections: number;

  @ApiProperty({ type: MenuOptionReferenceResponseDto, isArray: true })
  options: MenuOptionReferenceResponseDto[];
}
