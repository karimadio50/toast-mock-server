import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GetRestaurantDetailsResponseDto } from './get-restaurant-details.response';
import { GetRestaurantDetailsService } from './get-restaurant-details.service';

@ApiBearerAuth('BearerAuth')
@ApiSecurity('ToastRestaurantExternalId')
@ApiHeader({
  name: 'Toast-Restaurant-External-ID',
  required: true,
  description: 'Restaurant external ID used for auth guard validation.',
  schema: { type: 'string' },
})
@ApiTags('Restaurants')
@Controller('restaurants/v1/restaurants')
export class GetRestaurantDetailsController {
  constructor(
    private readonly getRestaurantDetailsService: GetRestaurantDetailsService,
  ) {}

  @Get(':restaurantGuid')
  @ApiOperation({
    summary: 'Get restaurant details',
    description: 'Returns details for a specific restaurant by GUID.',
  })
  @ApiParam({
    name: 'restaurantGuid',
    required: true,
    description: 'The unique GUID of the restaurant.',
    example: 'clrestoakseast0000000000001',
  })
  @ApiOkResponse({
    type: GetRestaurantDetailsResponseDto,
    description: 'Restaurant details fetched successfully.',
  })
  @ApiUnauthorizedResponse({ description: 'Authorization failed.' })
  @ApiNotFoundResponse({ description: 'Restaurant not found.' })
  async getRestaurantDetails(
    @Param('restaurantGuid') restaurantGuid: string,
    @Query('includeArchived') _includeArchived?: boolean,
  ): Promise<GetRestaurantDetailsResponseDto> {
    return this.getRestaurantDetailsService.execute(restaurantGuid);
  }
}
