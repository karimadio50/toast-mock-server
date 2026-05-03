import { Controller, Get, Headers, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiOkResponse, ApiOperation, ApiSecurity } from '@nestjs/swagger';
import { GetDiningOptionsService } from './get-dining-options.service';

@ApiBearerAuth('BearerAuth')
@ApiSecurity('ToastRestaurantExternalId')
@ApiHeader({
  name: 'Toast-Restaurant-External-ID',
  required: true,
  description: 'Restaurant external ID',
  schema: { type: 'string' },
})
@Controller('config/v2/diningOptions')
export class GetDiningOptionsController {
  constructor(private readonly getDiningOptionsService: GetDiningOptionsService) { }
  @Get()
  @ApiOperation({ summary: 'Get dining options' })
  async getDiningOptions(
    @Headers('toast-restaurant-external-id') restaurantExternalIdHeader: string | string[] | undefined,
  ): Promise<any[]> {
    return this.getDiningOptionsService.execute(restaurantExternalIdHeader);
  }
}
