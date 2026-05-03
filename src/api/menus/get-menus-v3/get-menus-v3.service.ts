import { Injectable, NotFoundException } from '@nestjs/common';
import { ToastPosDataService } from '@core/services/toast-pos-data.service';
import { GetMenusV3ResponseDto } from './get-menus-v3.response';

@Injectable()
export class GetMenusV3Service {
  constructor(private readonly toastPosDataService: ToastPosDataService) {}

  execute(
    restaurantExternalIdHeader: string | string[] | undefined,
  ): GetMenusV3ResponseDto {
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

    const fullMenusV3 = this.toastPosDataService.getFullMenusV3(restaurantExternalId);

    if (fullMenusV3) {
        // Overwrite restaurantGuid to match the requested restaurant for consistency
        return {
            ...fullMenusV3,
            restaurantGuid: restaurantData.restaurant.restaurantGuid,
            restaurantTimeZone: restaurantData.restaurant.timezone,
        };
    }

    throw new NotFoundException('V3 Menus data not found');
  }
}
