import { Controller, Get, Headers, Param } from '@nestjs/common';
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
import { EmployeeResponseDto } from '../get-employees/get-employees.response';
import { GetEmployeeService } from './get-employee.service';

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
export class GetEmployeeController {
  constructor(private readonly getEmployeeService: GetEmployeeService) {}

  @Get('employees/:employeeId')
  @ApiOperation({
    summary: 'Get information about one employee',
    description: 'Returns an Employee object containing information about one restaurant employee.',
  })
  @ApiOkResponse({
    type: EmployeeResponseDto,
    description: 'Employee fetched successfully.',
  })
  @ApiBadRequestResponse({ description: 'Invalid request input.' })
  @ApiUnauthorizedResponse({ description: 'Authorization failed.' })
  @ApiNotFoundResponse({ description: 'Employee not found.' })
  async getEmployee(
    @Headers('toast-restaurant-external-id')
    restaurantExternalIdHeader: string | string[] | undefined,
    @Param('employeeId') employeeId: string,
  ): Promise<EmployeeResponseDto> {
    return this.getEmployeeService.execute(restaurantExternalIdHeader, employeeId);
  }
}
