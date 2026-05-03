import { Injectable } from '@nestjs/common';
import { ToastPosDataService } from '@core/services/toast-pos-data.service';
import { GetPreModifierGroupsQueryDto } from './get-pre-modifier-groups.request';
import { GetPreModifierGroupsResponseDto } from './get-pre-modifier-groups.response';

@Injectable()
export class GetPreModifierGroupsService {
  constructor(private readonly toastPosDataService: ToastPosDataService) {}

  execute(
    restaurantExternalIdHeader: string | string[] | undefined,
    _query: GetPreModifierGroupsQueryDto,
  ): GetPreModifierGroupsResponseDto[] {
    const restaurantExternalId =
      this.toastPosDataService.getRestaurantExternalIdFromHeader(
        restaurantExternalIdHeader,
      );

    const groups = this.toastPosDataService.getCollectionByRestaurantExternalId(
      restaurantExternalId,
      'preModifierGroups',
    );

    return groups.map((group) => ({
      guid: group.guid,
      entityType: group.entityType,
      name: group.name,
      isDefault: group.isDefault,
    }));
  }
}
