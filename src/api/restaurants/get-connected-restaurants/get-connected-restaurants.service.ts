import { Injectable, NotFoundException } from '@nestjs/common';
import { ToastPosDataService } from '@core/services/toast-pos-data.service';
import { GetConnectedRestaurantsResponseDto } from './get-connected-restaurants.response';

@Injectable()
export class GetConnectedRestaurantsService {
  constructor(private readonly toastPosDataService: ToastPosDataService) {}

  execute(): GetConnectedRestaurantsResponseDto[] {
    const data = this.toastPosDataService.getConnectedRestaurants();
    
    if (!data) {
      throw new NotFoundException('Connected restaurants data not found');
    }

    // Returning as an array to match the user's provided example response: [ { ... } ]
    return [data];
  }
}
