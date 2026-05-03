import { Injectable } from '@nestjs/common';
import { ToastPosDataService } from '@core/services/toast-pos-data.service';
import { GetMenuGroupsQueryDto } from './get-menu-groups.request';
import { GetMenuGroupsResponseDto } from './get-menu-groups.response';

@Injectable()
export class GetMenuGroupsService {
  constructor(private readonly toastPosDataService: ToastPosDataService) {}

  execute(
    restaurantExternalIdHeader: string | string[] | undefined,
    _query: GetMenuGroupsQueryDto,
  ): GetMenuGroupsResponseDto[] {
    const restaurantExternalId =
      this.toastPosDataService.getRestaurantExternalIdFromHeader(
        restaurantExternalIdHeader,
      );

    const menuGroups = this.toastPosDataService.getCollectionByRestaurantExternalId(
      restaurantExternalId,
      'menuGroups',
    );

    return menuGroups.map((group) => ({
      guid: group.guid,
      entityType: group.entityType,
      externalId: group.externalId,
      name: group.name,
      menu: group.menu,
      orderableOnline: group.orderableOnline,
      visibility: group.visibility,
      parent: group.parent,
      items: group.items,
      subgroups: group.subgroups,
      optionGroups: group.optionGroups,
      inheritOptionGroups: group.inheritOptionGroups,
      images: group.images,
      unitOfMeasure: group.unitOfMeasure,
      inheritUnitOfMeasure: group.inheritUnitOfMeasure,
    }));
  }
}
