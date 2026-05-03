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
import { GetTablesQueryDto } from './get-tables.request';
import { GetTablesResponseDto } from './get-tables.response';
import { GetTablesService } from './get-tables.service';

@ApiBearerAuth('BearerAuth')
@ApiSecurity('ToastRestaurantExternalId')
@ApiHeader({
  name: 'Toast-Restaurant-External-ID',
  required: true,
  description: 'Restaurant external ID used to scope table data.',
  schema: { type: 'string', example: 'dc-oaks-east' },
})
@Controller('config/v2')
export class GetTablesController {
  constructor(private readonly getTablesService: GetTablesService) {}

  @Get('tables')
  @ApiOperation({
    summary: 'Get tables',
    description:
      'Returns table data for the restaurant from Toast-Restaurant-External-ID header.',
  })
  @ApiOkResponse({
    type: GetTablesResponseDto,
    isArray: true,
    description: 'Tables fetched successfully.',
  })
  @ApiBadRequestResponse({ description: 'Invalid request input.' })
  @ApiUnauthorizedResponse({ description: 'Authorization failed.' })
  @ApiNotFoundResponse({ description: 'Restaurant not found.' })
  async getTables(
    @Headers('toast-restaurant-external-id')
    restaurantExternalIdHeader: string | string[] | undefined,
    @Query() query: GetTablesQueryDto,
  ): Promise<GetTablesResponseDto[]> {
    return this.getTablesService.execute(restaurantExternalIdHeader, query);
  }
}
