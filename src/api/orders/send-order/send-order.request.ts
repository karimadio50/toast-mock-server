import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class ToastEntityRefDto {
  @ApiProperty({ description: 'The GUID maintained by the Toast platform.' })
  @IsString()
  guid: string;
}

export class CheckRequestDto {
  @ApiPropertyOptional({
    description: 'The tabName for the order to identify your reservation and guest information.',
  })
  @IsOptional()
  @IsString()
  tabName?: string;
}

export class SendOrderRequestDto {
  @ApiPropertyOptional({ description: 'The diningOption used by restaurants for orders.' })
  @IsOptional()
  @ValidateNested()
  @Type(() => ToastEntityRefDto)
  diningOption?: ToastEntityRefDto;

  @ApiPropertyOptional({ description: 'The revenueCenter used by the restaurant for reservation orders.' })
  @IsOptional()
  @ValidateNested()
  @Type(() => ToastEntityRefDto)
  revenueCenter?: ToastEntityRefDto;

  @ApiPropertyOptional({ description: 'The table the guest has been assigned to.' })
  @IsOptional()
  @ValidateNested()
  @Type(() => ToastEntityRefDto)
  table?: ToastEntityRefDto;

  @ApiPropertyOptional({ description: 'The number of guests for the reservation.' })
  @IsOptional()
  @IsNumber()
  numberOfGuests?: number;

  @ApiProperty({ description: 'The checks for this order. Most orders have one check.' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CheckRequestDto)
  checks: CheckRequestDto[];

  @ApiPropertyOptional({ description: 'The employee guid of the server assigned to the reservation.' })
  @IsOptional()
  @ValidateNested()
  @Type(() => ToastEntityRefDto)
  server?: ToastEntityRefDto;
}
