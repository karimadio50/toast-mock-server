import { ApiProperty } from '@nestjs/swagger';

export class PreModifierParentDto {
  @ApiProperty({
    description: 'Unique identifier for the parent pre-modifier group',
    example: 'pmgeaststandard000000001',
  })
  guid: string;

  @ApiProperty({
    description: 'The entity type (PreModifierGroup)',
    example: 'PreModifierGroup',
  })
  entityType: string;
}

export class GetPreModifiersResponseDto {
  @ApiProperty({
    description: 'Unique identifier for the pre-modifier',
    example: 'pmeastno00000000000000001',
  })
  guid: string;

  @ApiProperty({
    description: 'The entity type (PreModifier)',
    example: 'PreModifier',
  })
  entityType: string;

  @ApiProperty({
    description: 'Name of the pre-modifier',
    example: 'No',
  })
  name: string;

  @ApiProperty({
    description: 'Whether to scale the price',
    example: true,
  })
  scalePrice: boolean;

  @ApiProperty({
    description: 'The base price of the pre-modifier',
    example: 0,
  })
  basePrice: number;

  @ApiProperty({
    description: 'The scale factor for the price',
    example: 0,
  })
  scaleFactor: number;

  @ApiProperty({
    description: 'The display mode (PREFIX or SUFFIX)',
    example: 'PREFIX',
  })
  displayMode: string;

  @ApiProperty({
    description: 'Parent pre-modifier group reference',
  })
  parent: PreModifierParentDto;

  @ApiProperty({
    description: 'Whether to charge as extra',
    example: false,
  })
  chargeAsExtra: boolean;
}
