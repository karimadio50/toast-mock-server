import { Injectable, NotFoundException } from '@nestjs/common';
import { ToastPosDataService } from '@core/services/toast-pos-data.service';
import { GetMenusV2ResponseDto } from './get-menus-v2.response';

@Injectable()
export class GetMenusV2Service {
  constructor(private readonly toastPosDataService: ToastPosDataService) {}

  execute(
    restaurantExternalIdHeader: string | string[] | undefined,
  ): GetMenusV2ResponseDto {
    const restaurantExternalId =
      this.toastPosDataService.getRestaurantExternalIdFromHeader(
        restaurantExternalIdHeader,
      );

    const restaurantData = this.toastPosDataService.getRestaurantDataByExternalId(
      restaurantExternalId,
    );

    if (!restaurantData) {
      throw new NotFoundException(`Restaurant with external ID ${restaurantExternalId} not found`);
    }

    const fullMenusV2 = this.toastPosDataService.getFullMenusV2(restaurantExternalId);
    
    if (fullMenusV2) {
      return {
        ...fullMenusV2,
        restaurantGuid: restaurantData.restaurant.restaurantGuid,
        restaurantTimeZone: restaurantData.restaurant.timezone,
      };
    }

    throw new NotFoundException('V2 Menus data not found');
  }
}
