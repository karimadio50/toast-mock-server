import { Injectable } from '@nestjs/common';
import { ToastPosDataService } from '@core/services/toast-pos-data.service';
import { GetModifierGroupsQueryDto } from './get-modifier-groups.request';
import { GetModifierGroupsResponseDto } from './get-modifier-groups.response';

@Injectable()
export class GetModifierGroupsService {
  constructor(private readonly toastPosDataService: ToastPosDataService) {}

  execute(
    restaurantExternalIdHeader: string | string[] | undefined,
    _query: GetModifierGroupsQueryDto,
  ): GetModifierGroupsResponseDto[] {
    const restaurantExternalId =
      this.toastPosDataService.getRestaurantExternalIdFromHeader(
        restaurantExternalIdHeader,
      );

    const modifierGroups = this.toastPosDataService.getCollectionByRestaurantExternalId(
      restaurantExternalId,
      'modifierGroups',
    );

    return modifierGroups.map((group) => ({
      guid: group.guid,
      entityType: group.entityType,
      externalId: group.externalId,
      name: group.name,
      options: group.options,
      minSelections: group.minSelections,
      maxSelections: group.maxSelections,
    }));
  }
}
