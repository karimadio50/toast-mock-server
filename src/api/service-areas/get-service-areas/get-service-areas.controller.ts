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
import { GetServiceAreasQueryDto } from './get-service-areas.request';
import { GetServiceAreasResponseDto } from './get-service-areas.response';
import { GetServiceAreasService } from './get-service-areas.service';

@ApiBearerAuth('BearerAuth')
@ApiSecurity('ToastRestaurantExternalId')
@ApiHeader({
  name: 'Toast-Restaurant-External-ID',
  required: true,
  description: 'Restaurant external ID used to scope service areas.',
  schema: { type: 'string', example: 'dc-oaks-east' },
})
@Controller('config/v2')
export class GetServiceAreasController {
  constructor(private readonly getServiceAreasService: GetServiceAreasService) {}

  @Get('serviceAreas')
  @ApiOperation({
    summary: 'Get service areas',
    description:
      'Returns all service areas for the restaurant identified by the Toast-Restaurant-External-ID header.',
  })
  @ApiOkResponse({
    type: GetServiceAreasResponseDto,
    isArray: true,
    description: 'Service areas fetched successfully.',
  })
  @ApiBadRequestResponse({ description: 'Invalid request input.' })
  @ApiUnauthorizedResponse({ description: 'Authorization failed.' })
  @ApiNotFoundResponse({ description: 'Restaurant not found.' })
  async getServiceAreas(
    @Headers('toast-restaurant-external-id')
    restaurantExternalIdHeader: string | string[] | undefined,
    @Query() query: GetServiceAreasQueryDto,
  ): Promise<GetServiceAreasResponseDto[]> {
    return this.getServiceAreasService.execute(restaurantExternalIdHeader, query);
  }
}
