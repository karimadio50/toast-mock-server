import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppExceptionFilter } from '@core/app-exception.filter';
import { ValidationPipe, Logger, CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();

    const { method, originalUrl, body } = req;
    const start = Date.now();

    this.logger.log(`--> [${method}] ${originalUrl}`);
    if (body && Object.keys(body).length > 0) {
      this.logger.log(`    Body: ${JSON.stringify(body)}`);
    }

    return next.handle().pipe(
      tap(() => {
        const delay = Date.now() - start;
        this.logger.log(`<-- [${method}] ${originalUrl} - ${res.statusCode} - ${delay}ms`);
      }),
    );
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new AppExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Toast')
    .setDescription('Toast Mock API')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Paste only the token value used after Bearer.',
      },
      'BearerAuth',
    )
    .addSecurity('ToastRestaurantExternalId', {
      type: 'apiKey',
      in: 'header',
      name: 'Toast-Restaurant-External-ID',
      description: 'Restaurant external ID, for example dc-oaks-east.',
    })
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const PORT = process.env.PORT ?? 3000;
  await app.listen(PORT);

  const nodeEnv = process.env.NODE_ENV ?? '.env';
  console.log(`
      🚀 Auth API running
      ----------------------------------------
      URL        : http://localhost:${PORT}
      Swagger    : http://localhost:${PORT}/api
      Environment: ${nodeEnv}
      ----------------------------------------
      `);
}
bootstrap();
