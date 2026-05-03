import { Controller, Get, Headers, Param } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JobResponseDto } from '../get-jobs/get-jobs.response';
import { GetJobService } from './get-job.service';

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
export class GetJobController {
  constructor(private readonly getJobService: GetJobService) {}

  @Get('jobs/:jobId')
  @ApiOperation({
    summary: 'Get one job',
    description: 'Returns a Job object containing information about one employee job at a restaurant.',
  })
  @ApiOkResponse({
    type: JobResponseDto,
    description: 'Job fetched successfully.',
  })
  @ApiBadRequestResponse({ description: 'Invalid request input.' })
  @ApiUnauthorizedResponse({ description: 'Authorization failed.' })
  @ApiNotFoundResponse({ description: 'Job not found.' })
  async getJob(
    @Headers('toast-restaurant-external-id')
    restaurantExternalIdHeader: string | string[] | undefined,
    @Param('jobId') jobId: string,
  ): Promise<JobResponseDto> {
    return this.getJobService.execute(restaurantExternalIdHeader, jobId);
  }
}
