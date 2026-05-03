import { Injectable, NotFoundException } from '@nestjs/common';
import { ToastPosDataService } from '@core/services/toast-pos-data.service';
import { EmployeeResponseDto } from '../get-employees/get-employees.response';

@Injectable()
export class GetEmployeeService {
  constructor(private readonly toastPosDataService: ToastPosDataService) {}

  execute(
    restaurantExternalIdHeader: string | string[] | undefined,
    employeeId: string,
  ): EmployeeResponseDto {
    const restaurantExternalId =
      this.toastPosDataService.getRestaurantExternalIdFromHeader(
        restaurantExternalIdHeader,
      );

    const employees = this.toastPosDataService.getCollectionByRestaurantExternalId(
      restaurantExternalId,
      'employees',
    );

    const employee = employees.find(
      (emp) => emp.guid === employeeId || emp.externalId === employeeId,
    );

    if (!employee) {
      throw new NotFoundException(`Employee not found with ID: ${employeeId}`);
    }

    return {
      ...employee,
    };
  }
}
