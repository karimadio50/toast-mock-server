import { ApiProperty } from '@nestjs/swagger';

export class GetMenusV3ResponseDto {
  @ApiProperty({ example: 'ea0a8ddc-1996-4cd1-bc9b-c9aaabff38dc' })
  restaurantGuid: string;

  @ApiProperty({ example: '2026-04-27T19:13:49.309+0000' })
  lastUpdated: string;

  @ApiProperty({ example: 'America/Denver' })
  restaurantTimeZone: string;

  @ApiProperty({ isArray: true })
  menus: any[];

  @ApiProperty()
  modifierGroupReferences: Record<string, any>;

  @ApiProperty()
  modifierOptionReferences: Record<string, any>;

  @ApiProperty()
  preModifierGroupReferences: Record<string, any>;
}
