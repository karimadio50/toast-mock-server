import { Injectable, NotFoundException } from '@nestjs/common';
import { ToastPosDataService } from '@core/services/toast-pos-data.service';
import { SendOrderRequestDto } from './send-order.request';
import { SendOrderResponseDto } from './send-order.response';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SendOrderService {
  constructor(private readonly toastPosDataService: ToastPosDataService) {}

  execute(
    restaurantExternalIdHeader: string | string[] | undefined,
    request: SendOrderRequestDto,
  ): SendOrderResponseDto {
    const restaurantExternalId =
      this.toastPosDataService.getRestaurantExternalIdFromHeader(
        restaurantExternalIdHeader,
      );

    // Validate restaurant exists
    this.toastPosDataService.getRestaurantDataByExternalId(
      restaurantExternalId,
    );

    // In a real mock, we would validate that table/diningOption/revenueCenter exist.
    // For this mock, we will just echo back the request with extra metadata.

    const orderGuid = uuidv4();
    const now = new Date().toISOString();

    const response: SendOrderResponseDto = {
      guid: orderGuid,
      entityType: 'Order',
      externalId: `order-${orderGuid.substring(0, 8)}`,
      diningOption: request.diningOption,
      checks: request.checks.map((check) => ({
        guid: uuidv4(),
        tabName: check.tabName,
        totalAmount: 0, // Reservation orders typically have 0 initially
        paymentStatus: 'OPEN',
      })),
      table: request.table,
      revenueCenter: request.revenueCenter,
      numberOfGuests: request.numberOfGuests,
      approvalStatus: 'APPROVED',
      createdDate: now,
    };

    // Persist the order to mock storage
    this.toastPosDataService.saveOrder(response as any);

    return response;
  }
}
