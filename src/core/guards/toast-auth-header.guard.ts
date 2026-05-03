import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '@shared/decorators/is-public.decorator';
import { Request } from 'express';

@Injectable()
export class ToastAuthHeaderGuard implements CanActivate {
  constructor(private readonly configService: ConfigService,
    private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    // Let Swagger UI/docs and browser preflight requests through without auth.
    if (
      request.method === 'OPTIONS' ||
      request.path === '/' ||
      request.path.startsWith('/api')
    ) {
      return true;
    }

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const authorizationHeader =
      request.headers.authorization ??
      request.get('authorization') ??
      request.get('Authorization');

    if (!authorizationHeader) {
      throw new UnauthorizedException('Missing Authorization header');
    }

    if (!authorizationHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Authorization header must be in format: Bearer TOKEN',
      );
    }

    const receivedToken = authorizationHeader.slice('Bearer '.length).trim();
    const expectedToken =
      this.configService.get<string>('app.security.token') ?? process.env.TOKEN;

    if (!expectedToken) {
      throw new InternalServerErrorException('TOKEN is not configured');
    }

    if (receivedToken !== expectedToken) {
      throw new UnauthorizedException('Invalid bearer token');
    }

    // const restaurantExternalIdHeader =
    //   request.headers['toast-restaurant-external-id'];

    // if (
    //   typeof restaurantExternalIdHeader !== 'string' ||
    //   restaurantExternalIdHeader.trim().length === 0
    // ) {
    //   throw new BadRequestException(
    //     'Missing Toast-Restaurant-External-ID header',
    //   );
    // }

    return true;
  }
}
