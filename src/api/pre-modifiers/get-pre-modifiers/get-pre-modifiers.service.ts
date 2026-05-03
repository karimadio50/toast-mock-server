import { Injectable } from '@nestjs/common';
import { ToastPosDataService } from '@core/services/toast-pos-data.service';
import { GetPreModifiersQueryDto } from './get-pre-modifiers.request';
import { GetPreModifiersResponseDto } from './get-pre-modifiers.response';

@Injectable()
export class GetPreModifiersService {
  constructor(private readonly toastPosDataService: ToastPosDataService) {}

  execute(
    restaurantExternalIdHeader: string | string[] | undefined,
    _query: GetPreModifiersQueryDto,
  ): GetPreModifiersResponseDto[] {
    const restaurantExternalId =
      this.toastPosDataService.getRestaurantExternalIdFromHeader(
        restaurantExternalIdHeader,
      );

    const modifiers =
      this.toastPosDataService.getCollectionByRestaurantExternalId(
        restaurantExternalId,
        'preModifiers',
      );

    return modifiers.map((mod) => ({
      guid: mod.guid,
      entityType: mod.entityType,
      name: mod.name,
      scalePrice: mod.scalePrice,
      basePrice: mod.basePrice,
      scaleFactor: mod.scaleFactor,
      displayMode: mod.displayMode,
      parent: mod.parent,
      chargeAsExtra: mod.chargeAsExtra,
    }));
  }
}
