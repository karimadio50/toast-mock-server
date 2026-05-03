import { Injectable } from '@nestjs/common';
import { ToastPosDataService } from '@core/services/toast-pos-data.service';
import { GetMenuItemsQueryDto } from './get-menu-items.request';
import { GetMenuItemsResponseDto } from './get-menu-items.response';

@Injectable()
export class GetMenuItemsService {
  constructor(private readonly toastPosDataService: ToastPosDataService) {}

  execute(
    restaurantExternalIdHeader: string | string[] | undefined,
    _query: GetMenuItemsQueryDto,
  ): GetMenuItemsResponseDto[] {
    const restaurantExternalId =
      this.toastPosDataService.getRestaurantExternalIdFromHeader(
        restaurantExternalIdHeader,
      );

    const menuItems = this.toastPosDataService.getCollectionByRestaurantExternalId(
      restaurantExternalId,
      'menuItems',
    );

    return menuItems.map((item) => ({
      guid: item.guid,
      entityType: item.entityType,
      externalId: item.externalId,
      name: item.name,
      calories: item.calories,
      sku: item.sku,
      plu: item.plu,
      orderableOnline: item.orderableOnline,
      visibility: item.visibility,
      type: item.type,
      optionGroups: item.optionGroups,
      inheritOptionGroups: item.inheritOptionGroups,
      images: item.images,
      unitOfMeasure: item.unitOfMeasure,
      inheritUnitOfMeasure: item.inheritUnitOfMeasure,
    }));
  }
}
