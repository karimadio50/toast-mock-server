import { Controller, Get, Headers, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiOkResponse, ApiOperation, ApiSecurity } from '@nestjs/swagger';
import { GetRevenueCentersService } from './get-revenue-centers.service';

@ApiBearerAuth('BearerAuth')
@ApiSecurity('ToastRestaurantExternalId')
@ApiHeader({
  name: 'Toast-Restaurant-External-ID',
  required: true,
  description: 'Restaurant external ID',
  schema: { type: 'string' },
})
@Controller('config/v2/revenueCenters')
export class GetRevenueCentersController {
  constructor(private readonly getRevenueCentersService: GetRevenueCentersService) {}

  @Get()
  @ApiOperation({ summary: 'Get revenue centers' })
  async getRevenueCenters(
    @Headers('toast-restaurant-external-id') restaurantExternalIdHeader: string | string[] | undefined,
  ): Promise<any[]> {
    return this.getRevenueCentersService.execute(restaurantExternalIdHeader);
  }
}
