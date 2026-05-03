import { ApiProperty } from '@nestjs/swagger';

export class GetPreModifierGroupsResponseDto {
  @ApiProperty({
    description: 'Unique identifier for the pre-modifier group',
    example: 'pmgeaststandard000000001',
  })
  guid: string;

  @ApiProperty({
    description: 'The entity type (PreModifierGroup)',
    example: 'PreModifierGroup',
  })
  entityType: string;

  @ApiProperty({
    description: 'Name of the pre-modifier group',
    example: 'Standard',
  })
  name: string;

  @ApiProperty({
    description: 'Whether this is the default pre-modifier group',
    example: true,
  })
  isDefault: boolean;
}
