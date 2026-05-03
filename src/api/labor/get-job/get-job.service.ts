import { Injectable, NotFoundException } from '@nestjs/common';
import { ToastPosDataService } from '@core/services/toast-pos-data.service';
import { JobResponseDto } from '../get-jobs/get-jobs.response';

@Injectable()
export class GetJobService {
  constructor(private readonly toastPosDataService: ToastPosDataService) {}

  execute(
    restaurantExternalIdHeader: string | string[] | undefined,
    jobId: string,
  ): JobResponseDto {
    const restaurantExternalId =
      this.toastPosDataService.getRestaurantExternalIdFromHeader(
        restaurantExternalIdHeader,
      );

    const jobs = this.toastPosDataService.getCollectionByRestaurantExternalId(
      restaurantExternalId,
      'jobs',
    );

    const job = jobs.find(
      (j) => j.guid === jobId || j.externalId === jobId,
    );

    if (!job) {
      throw new NotFoundException(`Job not found with ID: ${jobId}`);
    }

    return {
      ...job,
    };
  }
}
