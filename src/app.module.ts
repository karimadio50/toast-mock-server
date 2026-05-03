import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from '@api/api.module';
import { AppConfigModule } from '@core/modules/config.module';
import { ToastAuthHeaderGuard } from '@core/guards/toast-auth-header.guard';

@Module({
  imports: [AppConfigModule, ApiModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ToastAuthHeaderGuard,
    },
  ],
})
export class AppModule {}
