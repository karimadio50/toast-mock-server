import { Controller, Get, Headers } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiSecurity } from '@nestjs/swagger';
import { GetConfigMenusService } from './get-menus.service';

@ApiBearerAuth('BearerAuth')
@ApiSecurity('ToastRestaurantExternalId')
@ApiHeader({ name: 'Toast-Restaurant-External-ID', required: true })
@Controller('config/v2/menus')
export class GetConfigMenusController {
  constructor(private readonly service: GetConfigMenusService) {}

  @Get()
  @ApiOperation({ summary: 'Get config v2 menus' })
  async getMenus(@Headers('toast-restaurant-external-id') restaurantExternalIdHeader: string | string[] | undefined): Promise<any[]> {
    return this.service.execute(restaurantExternalIdHeader);
  }
}
