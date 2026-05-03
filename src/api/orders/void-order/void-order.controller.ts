import {
  Body,
  Controller,
  Header,
  Headers,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { VoidOrderRequestDto } from './void-order.request';
import { SendOrderResponseDto } from '../send-order/send-order.response';
import { VoidOrderService } from './void-order.service';

@ApiBearerAuth('BearerAuth')
@ApiSecurity('ToastRestaurantExternalId')
@ApiHeader({
  name: 'Toast-Restaurant-External-ID',
  required: true,
  description: 'Restaurant external ID used to scope the request.',
  schema: { type: 'string', example: 'dc-oaks-east' },
})
@ApiTags('Orders')
@Controller('orders/v2')
export class VoidOrderController {
  constructor(private readonly voidOrderService: VoidOrderService) {}

  @Post('orders/:orderGuid/void')
  @ApiOperation({
    summary: 'Void an order',
    description:
      'Voids an order, and (if specified) its selections and payments. Only Orders with OTHER payment types can be voided.',
  })
  @ApiOkResponse({
    type: SendOrderResponseDto,
    description: 'The modified Order object.',
  })
  @ApiBadRequestResponse({ description: 'Invalid request parameters.' })
  @ApiUnauthorizedResponse({ description: 'Authorization failed.' })
  @ApiNotFoundResponse({ description: 'Order not found.' })
  async voidOrder(
    @Headers('toast-restaurant-external-id')
    restaurantExternalIdHeader: string | string[] | undefined,
    @Param('orderGuid') orderGuid: string,
    @Body() body: VoidOrderRequestDto,
  ): Promise<SendOrderResponseDto> {
    return this.voidOrderService.execute(
      restaurantExternalIdHeader,
      orderGuid,
      body,
    );
  }
}
