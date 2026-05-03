import { Controller, Get, Headers, Query } from '@nestjs/common';
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
import { GetMenuItemsQueryDto } from './get-menu-items.request';
import { GetMenuItemsResponseDto } from './get-menu-items.response';
import { GetMenuItemsService } from './get-menu-items.service';

@ApiBearerAuth('BearerAuth')
@ApiSecurity('ToastRestaurantExternalId')
@ApiHeader({
  name: 'Toast-Restaurant-External-ID',
  required: true,
  description: 'Restaurant external ID used to scope menu items.',
  schema: { type: 'string', example: 'dc-oaks-east' },
})
@Controller('config/v2')
export class GetMenuItemsController {
  constructor(private readonly getMenuItemsService: GetMenuItemsService) {}

  @Get('menuItems')
  @ApiOperation({
    summary: 'Get menu items',
    description: 'Returns menu items for the restaurant in the request header.',
  })
  @ApiOkResponse({
    type: GetMenuItemsResponseDto,
    isArray: true,
    description: 'Menu items fetched successfully.',
  })
  @ApiBadRequestResponse({ description: 'Invalid request input.' })
  @ApiUnauthorizedResponse({ description: 'Authorization failed.' })
  @ApiNotFoundResponse({ description: 'Restaurant not found.' })
  async getMenuItems(
    @Headers('toast-restaurant-external-id')
    restaurantExternalIdHeader: string | string[] | undefined,
    @Query() query: GetMenuItemsQueryDto,
  ): Promise<GetMenuItemsResponseDto[]> {
    return this.getMenuItemsService.execute(restaurantExternalIdHeader, query);
  }
}
