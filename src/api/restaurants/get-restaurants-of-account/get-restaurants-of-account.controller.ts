import { Controller, Get, Query } from '@nestjs/common';
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
import { GetRestaurantsOfAccountQueryDto } from './get-restaurants-of-account.request';
import { GetRestaurantsOfAccountResponseDto } from './get-restaurants-of-account.response';
import { GetRestaurantsOfAccountService } from './get-restaurants-of-account.service';

@ApiBearerAuth('BearerAuth')
// @ApiSecurity('ToastRestaurantExternalId')
// @ApiHeader({
//   name: 'Toast-Restaurant-External-ID',
//   required: true,
//   description:
//     'Restaurant external ID used for auth guard validation. Example: dc-oaks-east.',
//   schema: { type: 'string' },
// })
@Controller('partners/v1/restaurants')
export class GetRestaurantsOfAccountController {
  constructor(
    private readonly getRestaurantsOfAccountService: GetRestaurantsOfAccountService,
  ) { }

  @Get()
  @ApiOperation({
    summary: 'Get restaurants of the account',
    description:
      'Returns all restaurants configured under the mock Toast account, optionally filtered by query params.',
  })
  @ApiOkResponse({
    type: GetRestaurantsOfAccountResponseDto,
    isArray: true,
    description: 'Restaurants fetched successfully.',
  })
  @ApiBadRequestResponse({ description: 'Invalid request input.' })
  @ApiUnauthorizedResponse({ description: 'Authorization failed.' })
  @ApiNotFoundResponse({ description: 'Account not found.' })
  async getRestaurantsOfAccount(
    @Query() query: GetRestaurantsOfAccountQueryDto,
  ): Promise<GetRestaurantsOfAccountResponseDto[]> {
    return this.getRestaurantsOfAccountService.execute(query);
  }
}
