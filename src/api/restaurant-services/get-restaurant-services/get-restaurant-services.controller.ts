import { Controller, Get, Headers, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiOkResponse, ApiOperation, ApiSecurity } from '@nestjs/swagger';
import { GetRestaurantServicesService } from './get-restaurant-services.service';

@ApiBearerAuth('BearerAuth')
@ApiSecurity('ToastRestaurantExternalId')
@ApiHeader({
  name: 'Toast-Restaurant-External-ID',
  required: true,
  description: 'Restaurant external ID',
  schema: { type: 'string' },
})
@Controller('config/v2/restaurantServices')
export class GetRestaurantServicesController {
  constructor(private readonly getRestaurantServicesService: GetRestaurantServicesService) {}

  @Get()
  @ApiOperation({ summary: 'Get restaurant services' })
  async getRestaurantServices(
    @Headers('toast-restaurant-external-id') restaurantExternalIdHeader: string | string[] | undefined,
  ): Promise<any[]> {
    return this.getRestaurantServicesService.execute(restaurantExternalIdHeader);
  }
}
