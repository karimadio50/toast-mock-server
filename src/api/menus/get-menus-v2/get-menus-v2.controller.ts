import { Controller, Get, Headers } from '@nestjs/common';
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
import { GetMenusV2ResponseDto } from './get-menus-v2.response';
import { GetMenusV2Service } from './get-menus-v2.service';

@ApiBearerAuth('BearerAuth')
@ApiSecurity('ToastRestaurantExternalId')
@ApiHeader({
  name: 'Toast-Restaurant-External-ID',
  required: true,
  description: 'Restaurant external ID used to scope menus.',
  schema: { type: 'string', example: 'dc-oaks-east' },
})
@ApiTags('Menus')
@Controller('menus/v2')
export class GetMenusV2Controller {
  constructor(private readonly getMenusV2Service: GetMenusV2Service) {}

  @Get('menus')
  @ApiOperation({
    summary: 'Get menus V2',
    description: 'Returns menus for the restaurant in the request header using V2 format.',
  })
  @ApiOkResponse({
    type: GetMenusV2ResponseDto,
    description: 'Menus fetched successfully.',
  })
  @ApiBadRequestResponse({ description: 'Invalid request input.' })
  @ApiUnauthorizedResponse({ description: 'Authorization failed.' })
  @ApiNotFoundResponse({ description: 'Restaurant not found.' })
  async getMenus(
    @Headers('toast-restaurant-external-id')
    restaurantExternalIdHeader: string | string[] | undefined,
  ): Promise<GetMenusV2ResponseDto> {
    return this.getMenusV2Service.execute(restaurantExternalIdHeader);
  }
}
