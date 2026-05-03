import { Injectable } from '@nestjs/common';
import { ToastPosDataService } from '@core/services/toast-pos-data.service';
import { GetShiftsQueryDto } from './get-shifts.request';
import { ShiftResponseDto } from './get-shifts.response';

@Injectable()
export class GetShiftsService {
  constructor(private readonly toastPosDataService: ToastPosDataService) {}

  execute(
    restaurantExternalIdHeader: string | string[] | undefined,
    query: GetShiftsQueryDto,
  ): ShiftResponseDto[] {
    const restaurantExternalId =
      this.toastPosDataService.getRestaurantExternalIdFromHeader(
        restaurantExternalIdHeader,
      );

    const shifts = this.toastPosDataService.getCollectionByRestaurantExternalId(
      restaurantExternalId,
      'shifts',
    );

    let filteredShifts = shifts || [];

    if (query.shiftIds && query.shiftIds.length > 0) {
      filteredShifts = filteredShifts.filter(
        (shift) =>
          query.shiftIds!.includes(shift.guid) ||
          (shift.externalId && query.shiftIds!.includes(shift.externalId)),
      );
    } else {
        // Date filtering (basic mock implementation matching Toast Date requirements)
        if (query.startDate) {
           filteredShifts = filteredShifts.filter(s => s.inDate >= query.startDate!);
        }
        if (query.endDate) {
           filteredShifts = filteredShifts.filter(s => s.outDate < query.endDate!);
        }
    }

    return filteredShifts.map((shift) => ({
      ...shift,
    }));
  }
}
