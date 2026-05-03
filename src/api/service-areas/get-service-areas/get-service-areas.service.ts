import { Injectable } from '@nestjs/common';
import { ToastPosDataService } from '@core/services/toast-pos-data.service';
import { GetServiceAreasQueryDto } from './get-service-areas.request';
import { GetServiceAreasResponseDto } from './get-service-areas.response';

@Injectable()
export class GetServiceAreasService {
  constructor(private readonly toastPosDataService: ToastPosDataService) { }

  execute(
    restaurantExternalIdHeader: string | string[] | undefined,
    _query: GetServiceAreasQueryDto,
  ): GetServiceAreasResponseDto[] {
    const restaurantExternalId =
      this.toastPosDataService.getRestaurantExternalIdFromHeader(
        restaurantExternalIdHeader,
      );

    const serviceAreas =
      this.toastPosDataService.getCollectionByRestaurantExternalId(
        restaurantExternalId,
        'serviceAreas',
      );

    return serviceAreas.map((serviceArea) => ({
      ...serviceArea,
      guid: serviceArea.guid,
      entityType: serviceArea.entityType,
      name: serviceArea.name,
      revenueCenter: {
        guid: serviceArea.revenueCenter?.guid,
        entityType: serviceArea.revenueCenter?.entityType,
        externalId: serviceArea.revenueCenter?.externalId || "",
      },
    }));
  }
}
