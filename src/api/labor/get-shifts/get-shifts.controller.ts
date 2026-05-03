import { Controller, Get, Headers, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GetShiftsQueryDto } from './get-shifts.request';
import { ShiftResponseDto } from './get-shifts.response';
import { GetShiftsService } from './get-shifts.service';

@ApiTags('Labor')
@ApiBearerAuth('BearerAuth')
@ApiSecurity('ToastRestaurantExternalId')
@ApiHeader({
  name: 'Toast-Restaurant-External-ID',
  required: true,
  description: 'Restaurant external ID used to scope shifts.',
  schema: { type: 'string', example: 'dc-oaks-east' },
})
@Controller('labor/v1')
export class GetShiftsController {
  constructor(private readonly getShiftsService: GetShiftsService) {}

  @Get('shifts')
  @ApiOperation({
    summary: 'Get shifts',
    description: 'Returns an array of Shift objects containing information about schedule shifts for restaurant employees.',
  })
  @ApiOkResponse({
    type: ShiftResponseDto,
    isArray: true,
    description: 'Shifts fetched successfully.',
  })
  @ApiBadRequestResponse({ description: 'Invalid request input.' })
  @ApiUnauthorizedResponse({ description: 'Authorization failed.' })
  async getShifts(
    @Headers('toast-restaurant-external-id')
    restaurantExternalIdHeader: string | string[] | undefined,
    @Query() query: GetShiftsQueryDto,
  ): Promise<ShiftResponseDto[]> {
    return this.getShiftsService.execute(restaurantExternalIdHeader, query);
  }
}
