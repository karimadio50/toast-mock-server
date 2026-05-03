import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OrderResponseEntityRefDto {
  @ApiProperty()
  guid: string;

  @ApiPropertyOptional()
  entityType?: string;

  @ApiPropertyOptional()
  externalId?: string;
}

export class CheckResponseDto {
  @ApiProperty()
  guid: string;

  @ApiPropertyOptional()
  tabName?: string;

  @ApiPropertyOptional()
  totalAmount?: number;

  @ApiPropertyOptional()
  paymentStatus?: string;

  @ApiPropertyOptional()
  voided?: boolean;
}

export class SendOrderResponseDto {
  @ApiProperty()
  guid: string;

  @ApiPropertyOptional()
  entityType?: string;

  @ApiPropertyOptional()
  externalId?: string;

  @ApiPropertyOptional({ type: OrderResponseEntityRefDto })
  diningOption?: OrderResponseEntityRefDto;

  @ApiProperty({ type: [CheckResponseDto] })
  checks: CheckResponseDto[];

  @ApiPropertyOptional({ type: OrderResponseEntityRefDto })
  table?: OrderResponseEntityRefDto;

  @ApiPropertyOptional({ type: OrderResponseEntityRefDto })
  revenueCenter?: OrderResponseEntityRefDto;

  @ApiPropertyOptional()
  numberOfGuests?: number;

  @ApiPropertyOptional()
  approvalStatus?: string;

  @ApiPropertyOptional()
  createdDate?: string;

  @ApiPropertyOptional()
  voided?: boolean;

  @ApiPropertyOptional()
  voidDate?: string;

  @ApiPropertyOptional()
  voidBusinessDate?: number;
}
