import { Injectable } from '@nestjs/common';
import { ToastPosDataService } from '@core/services/toast-pos-data.service';
import { GetBulkOrdersQueryDto } from './get-bulk-orders.request';
import { GetBulkOrdersResponseDto } from './get-bulk-orders.response';

@Injectable()
export class GetBulkOrdersService {
  constructor(private readonly toastPosDataService: ToastPosDataService) {}

  execute(
    restaurantExternalIdHeader: string | string[] | undefined,
    query: GetBulkOrdersQueryDto,
  ): GetBulkOrdersResponseDto {
    const restaurantExternalId =
      this.toastPosDataService.getRestaurantExternalIdFromHeader(
        restaurantExternalIdHeader,
      );

    // Validate restaurant exists (standard for scoping)
    this.toastPosDataService.getRestaurantDataByExternalId(restaurantExternalId);

    let orders = this.toastPosDataService.getOrders();

    // Filtering by date range
    if (query.startDate) {
      const start = new Date(query.startDate).getTime();
      orders = orders.filter((o) => {
        const modified = o.modifiedDate ? new Date(o.modifiedDate).getTime() : 0;
        return modified >= start;
      });
    }

    if (query.endDate) {
      const end = new Date(query.endDate).getTime();
      orders = orders.filter((o) => {
        const modified = o.modifiedDate ? new Date(o.modifiedDate).getTime() : 0;
        return modified < end;
      });
    }

    // Filtering by business date
    if (query.businessDate) {
      const bDate = parseInt(query.businessDate, 10);
      orders = orders.filter((o) => o.businessDate === bDate);
    }

    // Pagination
    const page = query.page || 1;
    const pageSize = query.pageSize || 100;
    const startIndex = (page - 1) * pageSize;
    const paginatedOrders = orders.slice(startIndex, startIndex + pageSize);

    return paginatedOrders as any;
  }
}
