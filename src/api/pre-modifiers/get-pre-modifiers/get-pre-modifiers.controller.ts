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
import { GetPreModifiersQueryDto } from './get-pre-modifiers.request';
import { GetPreModifiersResponseDto } from './get-pre-modifiers.response';
import { GetPreModifiersService } from './get-pre-modifiers.service';

@ApiBearerAuth('BearerAuth')
@ApiSecurity('ToastRestaurantExternalId')
@ApiHeader({
  name: 'Toast-Restaurant-External-ID',
  required: true,
  description: 'Restaurant external ID used to scope pre-modifiers.',
  schema: { type: 'string', example: 'dc-oaks-east' },
})
@ApiTags('ConfigV2')
@Controller('config/v2')
export class GetPreModifiersController {
  constructor(
    private readonly getPreModifiersService: GetPreModifiersService,
  ) {}

  @Get('preModifiers')
  @ApiOperation({
    summary: 'Get pre-modifiers',
    description:
      'Returns an array of PreModifier objects containing information about PreModifiers configured for a restaurant.',
  })
  @ApiOkResponse({
    type: GetPreModifiersResponseDto,
    isArray: true,
    description: 'Pre-modifiers fetched successfully.',
  })
  @ApiBadRequestResponse({ description: 'Invalid request input.' })
  @ApiUnauthorizedResponse({ description: 'Authorization failed.' })
  @ApiNotFoundResponse({ description: 'Restaurant not found.' })
  async getPreModifiers(
    @Headers('toast-restaurant-external-id')
    restaurantExternalIdHeader: string | string[] | undefined,
    @Query() query: GetPreModifiersQueryDto,
  ): Promise<GetPreModifiersResponseDto[]> {
    return this.getPreModifiersService.execute(
      restaurantExternalIdHeader,
      query,
    );
  }
}
