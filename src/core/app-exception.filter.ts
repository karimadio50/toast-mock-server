import { ErrorResponseModel } from '@core/models/error-response.model';
import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {

  catch(exception: any, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      const errorResponse: ErrorResponseModel = {errorMessages: []};

      if (exception instanceof BadRequestException) {
          const badRequestResponse = exception.getResponse() as any;
          if (typeof badRequestResponse === 'string') {
              errorResponse.errorMessages = [badRequestResponse];
          } else if (badRequestResponse.message) {
              errorResponse.errorMessages = Array.isArray(badRequestResponse.message)
                  ? badRequestResponse.message
                  : [badRequestResponse.message];
          }
          statusCode = exception.getStatus() || HttpStatus.BAD_REQUEST;
      } else if (exception instanceof HttpException) {
          const httpExceptionResponse = exception.getResponse() as any;
          errorResponse.errorMessages = typeof httpExceptionResponse === 'string'
              ? [httpExceptionResponse]
              : [httpExceptionResponse.message || 'An error occurred'];
          statusCode = exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
      } else if (exception instanceof Error) {
          errorResponse.errorMessages = ['An unexpected error occurred. Please try again later.'];
          errorResponse.systemErrorMessage = exception.message;
      } else {
          errorResponse.errorMessages = ['An unknown error occurred. Please contact the administrator.'];
      }

      response.status(statusCode).json(errorResponse);
  }

}
