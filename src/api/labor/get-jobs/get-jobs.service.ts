import { Injectable } from '@nestjs/common';
import { ToastPosDataService } from '@core/services/toast-pos-data.service';
import { GetJobsQueryDto } from './get-jobs.request';
import { JobResponseDto } from './get-jobs.response';

@Injectable()
export class GetJobsService {
  constructor(private readonly toastPosDataService: ToastPosDataService) {}

  execute(
    restaurantExternalIdHeader: string | string[] | undefined,
    query: GetJobsQueryDto,
  ): JobResponseDto[] {
    const restaurantExternalId =
      this.toastPosDataService.getRestaurantExternalIdFromHeader(
        restaurantExternalIdHeader,
      );

    const jobs = this.toastPosDataService.getCollectionByRestaurantExternalId(
      restaurantExternalId,
      'jobs',
    );

    let filteredJobs = jobs;
    if (query.jobIds && query.jobIds.length > 0) {
      filteredJobs = jobs.filter(
        (job) =>
          query.jobIds!.includes(job.guid) ||
          (job.externalId && query.jobIds!.includes(job.externalId)),
      );
    }

    return filteredJobs.map((job) => ({
      ...job,
    }));
  }
}
