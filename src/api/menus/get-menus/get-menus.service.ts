import { Injectable } from '@nestjs/common';
import { ToastPosDataService } from '@core/services/toast-pos-data.service';
import { GetMenusQueryDto } from './get-menus.request';
import { GetMenusResponseDto } from './get-menus.response';
import { ToastMenu } from '@core/models/toast-pos-data.model';

@Injectable()
export class GetMenusService {
  constructor(private readonly toastPosDataService: ToastPosDataService) { }

  execute(
    restaurantExternalIdHeader: string | string[] | undefined,
    _query: GetMenusQueryDto,
  ): GetMenusResponseDto[] {
    const restaurantExternalId =
      this.toastPosDataService.getRestaurantExternalIdFromHeader(
        restaurantExternalIdHeader,
      );

    const menus = this.toastPosDataService.getFullConfigMenus(restaurantExternalId);

    return menus.menus.map((menu: ToastMenu) => ({
      guid: menu.guid,
      entityType: menu.entityType,
      externalId: menu.externalId,
      name: menu.name,
      orderableOnline: menu.orderableOnline,
      visibility: menu.visibility,
      groups: menu.groups,
      images: menu.images,
      unitOfMeasure: menu.unitOfMeasure,
    }));
  }
}
