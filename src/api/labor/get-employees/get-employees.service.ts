import { Injectable } from '@nestjs/common';
import { ToastPosDataService } from '@core/services/toast-pos-data.service';
import { GetEmployeesQueryDto } from './get-employees.request';
import { EmployeeResponseDto } from './get-employees.response';

@Injectable()
export class GetEmployeesService {
  constructor(private readonly toastPosDataService: ToastPosDataService) {}

  execute(
    restaurantExternalIdHeader: string | string[] | undefined,
    query: GetEmployeesQueryDto,
  ): EmployeeResponseDto[] {
    const restaurantExternalId =
      this.toastPosDataService.getRestaurantExternalIdFromHeader(
        restaurantExternalIdHeader,
      );

    const employees = this.toastPosDataService.getCollectionByRestaurantExternalId(
      restaurantExternalId,
      'employees',
    );

    let filteredEmployees = employees;
    if (query.employeeIds && query.employeeIds.length > 0) {
      filteredEmployees = employees.filter(
        (emp) =>
          query.employeeIds!.includes(emp.guid) ||
          (emp.externalId && query.employeeIds!.includes(emp.externalId)),
      );
    }

    return filteredEmployees.map((emp) => ({
      ...emp,
    }));
  }
}
