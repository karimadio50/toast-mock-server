import { Injectable } from '@nestjs/common';
import { ToastPosDataService } from '@core/services/toast-pos-data.service';

@Injectable()
export class GetDiningOptionsService {
  constructor(private readonly toastPosDataService: ToastPosDataService) {}

  execute(restaurantExternalIdHeader: string | string[] | undefined): any[] {
    const restaurantExternalId = this.toastPosDataService.getRestaurantExternalIdFromHeader(restaurantExternalIdHeader);
    return this.toastPosDataService.getCollectionByRestaurantExternalId(restaurantExternalId, 'diningOptions');
  }
}
