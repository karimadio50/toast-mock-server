import { Injectable } from '@nestjs/common';
import { ToastPosDataService } from '@core/services/toast-pos-data.service';
import { GetRestaurantDetailsResponseDto } from './get-restaurant-details.response';

@Injectable()
export class GetRestaurantDetailsService {
  constructor(private readonly toastPosDataService: ToastPosDataService) {}

  execute(restaurantGuid: string): GetRestaurantDetailsResponseDto {
    const restaurantData =
      this.toastPosDataService.getRestaurantDataByGuid(restaurantGuid);

    return restaurantData.restaurant as GetRestaurantDetailsResponseDto;
  }
}
