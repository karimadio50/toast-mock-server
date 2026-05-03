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
import { GetPreModifierGroupsQueryDto } from './get-pre-modifier-groups.request';
import { GetPreModifierGroupsResponseDto } from './get-pre-modifier-groups.response';
import { GetPreModifierGroupsService } from './get-pre-modifier-groups.service';

@ApiBearerAuth('BearerAuth')
@ApiSecurity('ToastRestaurantExternalId')
@ApiHeader({
  name: 'Toast-Restaurant-External-ID',
  required: true,
  description: 'Restaurant external ID used to scope pre-modifier groups.',
  schema: { type: 'string', example: 'dc-oaks-east' },
})
@ApiTags('ConfigV2')
@Controller('config/v2')
export class GetPreModifierGroupsController {
  constructor(
    private readonly getPreModifierGroupsService: GetPreModifierGroupsService,
  ) {}

  @Get('preModifierGroups')
  @ApiOperation({
    summary: 'Get pre-modifier groups',
    description:
      'Returns an array of PreModifierGroup objects containing information about PreModifierGroups configured for a restaurant.',
  })
  @ApiOkResponse({
    type: GetPreModifierGroupsResponseDto,
    isArray: true,
    description: 'Pre-modifier groups fetched successfully.',
  })
  @ApiBadRequestResponse({ description: 'Invalid request input.' })
  @ApiUnauthorizedResponse({ description: 'Authorization failed.' })
  @ApiNotFoundResponse({ description: 'Restaurant not found.' })
  async getPreModifierGroups(
    @Headers('toast-restaurant-external-id')
    restaurantExternalIdHeader: string | string[] | undefined,
    @Query() query: GetPreModifierGroupsQueryDto,
  ): Promise<GetPreModifierGroupsResponseDto[]> {
    return this.getPreModifierGroupsService.execute(
      restaurantExternalIdHeader,
      query,
    );
  }
}
