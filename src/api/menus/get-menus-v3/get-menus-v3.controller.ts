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
import { GetMenusV3ResponseDto } from './get-menus-v3.response';
import { GetMenusV3Service } from './get-menus-v3.service';

@ApiBearerAuth('BearerAuth')
@ApiSecurity('ToastRestaurantExternalId')
@ApiHeader({
  name: 'Toast-Restaurant-External-ID',
  required: true,
  description: 'Restaurant external ID used to scope menus.',
  schema: { type: 'string', example: 'dc-oaks-east' },
})
@ApiTags('Menus')
@Controller('menus/v3')
export class GetMenusV3Controller {
  constructor(private readonly getMenusV3Service: GetMenusV3Service) {}

  @Get('menus')
  @ApiOperation({
    summary: 'Get menus V3',
    description: 'Returns menus for the restaurant in the request header using V3 format.',
  })
  @ApiOkResponse({
    type: GetMenusV3ResponseDto,
    description: 'Menus fetched successfully.',
  })
  @ApiBadRequestResponse({ description: 'Invalid request input.' })
  @ApiUnauthorizedResponse({ description: 'Authorization failed.' })
  @ApiNotFoundResponse({ description: 'Restaurant not found.' })
  async getMenus(
    @Headers('toast-restaurant-external-id')
    restaurantExternalIdHeader: string | string[] | undefined,
  ): Promise<GetMenusV3ResponseDto> {
    return this.getMenusV3Service.execute(restaurantExternalIdHeader);
  }
}
