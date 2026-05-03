import { Body, Controller, Headers, Post } from '@nestjs/common';
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
import { SendOrderRequestDto } from './send-order.request';
import { SendOrderResponseDto } from './send-order.response';
import { SendOrderService } from './send-order.service';

@ApiBearerAuth('BearerAuth')
@ApiSecurity('ToastRestaurantExternalId')
@ApiHeader({
  name: 'Toast-Restaurant-External-ID',
  required: true,
  description: 'Restaurant external ID used to scope orders.',
  schema: { type: 'string', example: 'dc-oaks-east' },
})
@ApiTags('Orders')
@Controller('orders/v2')
export class SendOrderController {
  constructor(private readonly sendOrderService: SendOrderService) {}

  @Post('orders')
  @ApiOperation({
    summary: 'Post an order',
    description: 'Submits an order (or reservation) to the server.',
  })
  @ApiOkResponse({
    type: SendOrderResponseDto,
    description: 'Order submitted successfully.',
  })
  @ApiBadRequestResponse({ description: 'Invalid request input.' })
  @ApiUnauthorizedResponse({ description: 'Authorization failed.' })
  @ApiNotFoundResponse({ description: 'Restaurant not found.' })
  async sendOrder(
    @Headers('toast-restaurant-external-id')
    restaurantExternalIdHeader: string | string[] | undefined,
    @Body() body: SendOrderRequestDto,
  ): Promise<SendOrderResponseDto> {
    return this.sendOrderService.execute(restaurantExternalIdHeader, body);
  }
}
