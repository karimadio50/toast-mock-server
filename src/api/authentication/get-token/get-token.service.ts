import { ToastPosDataService } from '@core/services/toast-pos-data.service';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class GetTokenService {
  constructor(private readonly toastPosDataService: ToastPosDataService) { }

  execute(): any {
    return this.toastPosDataService.getAccount();
  }
}
