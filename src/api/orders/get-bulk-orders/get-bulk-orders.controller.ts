import { Controller, Get, Header, Headers, Query } from '@nestjs/common';
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
import { GetBulkOrdersQueryDto } from './get-bulk-orders.request';
import { SendOrderResponseDto } from '../send-order/send-order.response';
import { GetBulkOrdersService } from './get-bulk-orders.service';

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
export class GetBulkOrdersController {
  constructor(private readonly getBulkOrdersService: GetBulkOrdersService) {}

  @Get('ordersBulk')
  @ApiOperation({
    summary: 'Get multiple orders',
    description:
      'Returns an array of Order objects containing detailed information about all of the orders opened during a period of time.',
  })
  @ApiOkResponse({
    type: [SendOrderResponseDto],
    description: 'A JSON array of Order objects.',
  })
  @ApiBadRequestResponse({ description: 'Invalid request parameters.' })
  @ApiUnauthorizedResponse({ description: 'Authorization failed.' })
  @ApiNotFoundResponse({ description: 'Restaurant not found.' })
  async getBulkOrders(
    @Headers('toast-restaurant-external-id')
    restaurantExternalIdHeader: string | string[] | undefined,
    @Query() query: GetBulkOrdersQueryDto,
  ): Promise<SendOrderResponseDto[]> {
    return this.getBulkOrdersService.execute(restaurantExternalIdHeader, query);
  }
}
