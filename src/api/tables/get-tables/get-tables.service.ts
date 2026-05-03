import { Injectable } from '@nestjs/common';
import { ToastPosDataService } from '@core/services/toast-pos-data.service';
import { GetTablesQueryDto } from './get-tables.request';
import { GetTablesResponseDto } from './get-tables.response';

@Injectable()
export class GetTablesService {
  constructor(private readonly toastPosDataService: ToastPosDataService) { }

  execute(
    restaurantExternalIdHeader: string | string[] | undefined,
    _query: GetTablesQueryDto,
  ): GetTablesResponseDto[] {
    const restaurantExternalId =
      this.toastPosDataService.getRestaurantExternalIdFromHeader(
        restaurantExternalIdHeader,
      );

    const restaurantData =
      this.toastPosDataService.getRestaurantDataByExternalId(restaurantExternalId);

    const serviceAreasByGuid = new Map(
      restaurantData.serviceAreas.map((serviceArea) => [serviceArea.guid, serviceArea]),
    );

    return restaurantData.tables.map(table => ({
      ...table,
      serviceArea: {
        guid: table.serviceArea.guid,
        entityType: table.serviceArea.entityType,
        externalId: table.serviceArea.externalId,
      },
      revenueCenter: table.revenueCenter,
    })) as GetTablesResponseDto[];
  }
}