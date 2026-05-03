import { Injectable, NotFoundException } from '@nestjs/common';
import { ToastPosDataService } from '@core/services/toast-pos-data.service';
import { GetRestaurantsOfAccountQueryDto } from './get-restaurants-of-account.request';
import { GetRestaurantsOfAccountResponseDto } from './get-restaurants-of-account.response';

@Injectable()
export class GetRestaurantsOfAccountService {
  constructor(private readonly toastPosDataService: ToastPosDataService) {}

  execute(
    query: GetRestaurantsOfAccountQueryDto,
  ): GetRestaurantsOfAccountResponseDto[] {
    const account = this.toastPosDataService.getAccount();

    if (
      query.accountExternalId &&
      query.accountExternalId.trim() !== account.externalId
    ) {
      throw new NotFoundException(
        `Account not found for external ID: ${query.accountExternalId}`,
      );
    }

    const restaurants = this.toastPosDataService.listRestaurants();
    const filteredRestaurants = query.restaurantExternalId
      ? restaurants.filter(
          ({ externalId }) => externalId === query.restaurantExternalId,
        )
      : restaurants;

    return filteredRestaurants.map((restaurant) => ({
      restaurantGuid: restaurant.restaurantGuid,
      managementGroupGuid: restaurant.managementGroupGuid,
      deleted: restaurant.deleted,
      restaurantName: restaurant.restaurantName,
      locationName: restaurant.locationName,
      createdByEmailAddress: restaurant.createdByEmailAddress,
      externalGroupRef: restaurant.externalGroupRef,
      externalRestaurantRef: restaurant.externalRestaurantRef,
      modifiedDate: restaurant.modifiedDate,
      createdDate: restaurant.createdDate,
      isoModifiedDate: restaurant.isoModifiedDate,
      isoCreatedDate: restaurant.isoCreatedDate,
    }));
  }
}
