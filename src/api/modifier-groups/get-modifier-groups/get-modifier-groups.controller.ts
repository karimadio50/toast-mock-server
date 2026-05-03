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
import { GetModifierGroupsQueryDto } from './get-modifier-groups.request';
import { GetModifierGroupsResponseDto } from './get-modifier-groups.response';
import { GetModifierGroupsService } from './get-modifier-groups.service';

@ApiBearerAuth('BearerAuth')
@ApiSecurity('ToastRestaurantExternalId')
@ApiHeader({
  name: 'Toast-Restaurant-External-ID',
  required: true,
  description: 'Restaurant external ID used to scope modifier groups.',
  schema: { type: 'string', example: 'dc-oaks-east' },
})
@Controller('config/v2')
export class GetModifierGroupsController {
  constructor(
    private readonly getModifierGroupsService: GetModifierGroupsService,
  ) {}

  @Get('menuOptionGroups')
  @ApiOperation({
    summary: 'Get modifier groups',
    description: 'Returns modifier groups for the restaurant in the request header.',
  })
  @ApiOkResponse({
    type: GetModifierGroupsResponseDto,
    isArray: true,
    description: 'Modifier groups fetched successfully.',
  })
  @ApiBadRequestResponse({ description: 'Invalid request input.' })
  @ApiUnauthorizedResponse({ description: 'Authorization failed.' })
  @ApiNotFoundResponse({ description: 'Restaurant not found.' })
  async getModifierGroups(
    @Headers('toast-restaurant-external-id')
    restaurantExternalIdHeader: string | string[] | undefined,
    @Query() query: GetModifierGroupsQueryDto,
  ): Promise<GetModifierGroupsResponseDto[]> {
    return this.getModifierGroupsService.execute(restaurantExternalIdHeader, query);
  }
}
