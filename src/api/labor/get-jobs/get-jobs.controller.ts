import { Controller, Get, Headers, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GetJobsQueryDto } from './get-jobs.request';
import { JobResponseDto } from './get-jobs.response';
import { GetJobsService } from './get-jobs.service';

@ApiTags('Labor')
@ApiBearerAuth('BearerAuth')
@ApiSecurity('ToastRestaurantExternalId')
@ApiHeader({
  name: 'Toast-Restaurant-External-ID',
  required: true,
  description: 'Restaurant external ID used to scope jobs.',
  schema: { type: 'string', example: 'dc-oaks-east' },
})
@Controller('labor/v1')
export class GetJobsController {
  constructor(private readonly getJobsService: GetJobsService) {}

  @Get('jobs')
  @ApiOperation({
    summary: 'Get jobs',
    description: 'Returns an array of Job objects containing information about the employee jobs configured at a restaurant.',
  })
  @ApiOkResponse({
    type: JobResponseDto,
    isArray: true,
    description: 'Jobs fetched successfully.',
  })
  @ApiBadRequestResponse({ description: 'Invalid request input.' })
  @ApiUnauthorizedResponse({ description: 'Authorization failed.' })
  async getJobs(
    @Headers('toast-restaurant-external-id')
    restaurantExternalIdHeader: string | string[] | undefined,
    @Query() query: GetJobsQueryDto,
  ): Promise<JobResponseDto[]> {
    return this.getJobsService.execute(restaurantExternalIdHeader, query);
  }
}
