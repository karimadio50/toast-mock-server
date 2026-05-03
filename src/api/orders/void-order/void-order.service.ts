import { Injectable } from '@nestjs/common';
import { ToastPosDataService } from '@core/services/toast-pos-data.service';
import { VoidOrderRequestDto } from './void-order.request';
import { SendOrderResponseDto } from '../send-order/send-order.response';

@Injectable()
export class VoidOrderService {
  constructor(private readonly toastPosDataService: ToastPosDataService) {}

  execute(
    restaurantExternalIdHeader: string | string[] | undefined,
    orderGuid: string,
    body: VoidOrderRequestDto,
  ): SendOrderResponseDto {
    const restaurantExternalId =
      this.toastPosDataService.getRestaurantExternalIdFromHeader(
        restaurantExternalIdHeader,
      );

    // Validate restaurant exists (standard for scoping)
    this.toastPosDataService.getRestaurantDataByExternalId(restaurantExternalId);

    const voidedOrder = this.toastPosDataService.voidOrder(
      orderGuid,
      body.selections.voidAll,
      body.payments.voidAll,
    );

    return voidedOrder as any;
  }
}
