import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, ValidateNested } from 'class-validator';

export class VoidSubObjectDto {
  @ApiProperty({ example: true })
  @IsBoolean()
  @IsNotEmpty()
  voidAll: boolean;
}

export class VoidOrderRequestDto {
  @ApiProperty({ type: VoidSubObjectDto })
  @ValidateNested()
  @Type(() => VoidSubObjectDto)
  @IsNotEmpty()
  selections: VoidSubObjectDto;

  @ApiProperty({ type: VoidSubObjectDto })
  @ValidateNested()
  @Type(() => VoidSubObjectDto)
  @IsNotEmpty()
  payments: VoidSubObjectDto;
}
