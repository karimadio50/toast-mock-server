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
import { GetMenuGroupsQueryDto } from './get-menu-groups.request';
import { GetMenuGroupsResponseDto } from './get-menu-groups.response';
import { GetMenuGroupsService } from './get-menu-groups.service';

@ApiBearerAuth('BearerAuth')
@ApiSecurity('ToastRestaurantExternalId')
@ApiHeader({
  name: 'Toast-Restaurant-External-ID',
  required: true,
  description: 'Restaurant external ID used to scope menu groups.',
  schema: { type: 'string', example: 'dc-oaks-east' },
})
@Controller('config/v2')
export class GetMenuGroupsController {
  constructor(private readonly getMenuGroupsService: GetMenuGroupsService) {}

  @Get('menuGroups')
  @ApiOperation({
    summary: 'Get menu groups',
    description: 'Returns menu groups for the restaurant in the request header.',
  })
  @ApiOkResponse({
    type: GetMenuGroupsResponseDto,
    isArray: true,
    description: 'Menu groups fetched successfully.',
  })
  @ApiBadRequestResponse({ description: 'Invalid request input.' })
  @ApiUnauthorizedResponse({ description: 'Authorization failed.' })
  @ApiNotFoundResponse({ description: 'Restaurant not found.' })
  async getMenuGroups(
    @Headers('toast-restaurant-external-id')
    restaurantExternalIdHeader: string | string[] | undefined,
    @Query() query: GetMenuGroupsQueryDto,
  ): Promise<GetMenuGroupsResponseDto[]> {
    return this.getMenuGroupsService.execute(restaurantExternalIdHeader, query);
  }
}
