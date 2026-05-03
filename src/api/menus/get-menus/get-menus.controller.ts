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
import { GetMenusQueryDto } from './get-menus.request';
import { GetMenusResponseDto } from './get-menus.response';
import { GetMenusService } from './get-menus.service';

@ApiBearerAuth('BearerAuth')
@ApiSecurity('ToastRestaurantExternalId')
@ApiHeader({
  name: 'Toast-Restaurant-External-ID',
  required: true,
  description: 'Restaurant external ID used to scope menus.',
  schema: { type: 'string', example: 'dc-oaks-east' },
})
@Controller('config/v2')
export class GetMenusController {
  constructor(private readonly getMenusService: GetMenusService) {}

  @Get('menus')
  @ApiOperation({
    summary: 'Get menus',
    description: 'Returns menus for the restaurant in the request header.',
  })
  @ApiOkResponse({
    type: GetMenusResponseDto,
    isArray: true,
    description: 'Menus fetched successfully.',
  })
  @ApiBadRequestResponse({ description: 'Invalid request input.' })
  @ApiUnauthorizedResponse({ description: 'Authorization failed.' })
  @ApiNotFoundResponse({ description: 'Restaurant not found.' })
  async getMenus(
    @Headers('toast-restaurant-external-id')
    restaurantExternalIdHeader: string | string[] | undefined,
    @Query() query: GetMenusQueryDto,
  ): Promise<GetMenusResponseDto[]> {
    return this.getMenusService.execute(restaurantExternalIdHeader, query);
  }
}
