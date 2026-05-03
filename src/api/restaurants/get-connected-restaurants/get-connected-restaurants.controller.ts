import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GetConnectedRestaurantsResponseDto } from './get-connected-restaurants.response';
import { GetConnectedRestaurantsService } from './get-connected-restaurants.service';

@ApiBearerAuth('BearerAuth')
@ApiTags('Restaurants')
@Controller('partners/v1/connectedRestaurants')
export class GetConnectedRestaurantsController {
  constructor(
    private readonly getConnectedRestaurantsService: GetConnectedRestaurantsService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Get connected restaurants',
    description: 'Returns a list of restaurants connected to the integration.',
  })
  @ApiQuery({ name: 'lastModified', required: false, type: String })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
  @ApiQuery({ name: 'pageToken', required: false, type: String })
  @ApiOkResponse({
    type: GetConnectedRestaurantsResponseDto,
    isArray: true,
    description: 'Connected restaurants fetched successfully.',
  })
  @ApiUnauthorizedResponse({ description: 'Authorization failed.' })
  async getConnectedRestaurants(
    @Query('lastModified') _lastModified?: string,
    @Query('pageSize') _pageSize?: number,
    @Query('pageToken') _pageToken?: string,
  ): Promise<GetConnectedRestaurantsResponseDto[]> {
    return this.getConnectedRestaurantsService.execute();
  }
}
