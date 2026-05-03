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
import { GetEmployeesQueryDto } from './get-employees.request';
import { EmployeeResponseDto } from './get-employees.response';
import { GetEmployeesService } from './get-employees.service';

@ApiTags('Labor')
@ApiBearerAuth('BearerAuth')
@ApiSecurity('ToastRestaurantExternalId')
@ApiHeader({
  name: 'Toast-Restaurant-External-ID',
  required: true,
  description: 'Restaurant external ID used to scope employees.',
  schema: { type: 'string', example: 'dc-oaks-east' },
})
@Controller('labor/v1')
export class GetEmployeesController {
  constructor(private readonly getEmployeesService: GetEmployeesService) {}

  @Get('employees')
  @ApiOperation({
    summary: 'Get employees',
    description: 'Returns an array of Employee objects containing information about restaurant employees.',
  })
  @ApiOkResponse({
    type: EmployeeResponseDto,
    isArray: true,
    description: 'Employees fetched successfully.',
  })
  @ApiBadRequestResponse({ description: 'Invalid request input.' })
  @ApiUnauthorizedResponse({ description: 'Authorization failed.' })
  async getEmployees(
    @Headers('toast-restaurant-external-id')
    restaurantExternalIdHeader: string | string[] | undefined,
    @Query() query: GetEmployeesQueryDto,
  ): Promise<EmployeeResponseDto[]> {
    return this.getEmployeesService.execute(restaurantExternalIdHeader, query);
  }
}
