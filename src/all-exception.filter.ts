import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : exception['response']
        ? exception['response']['status']
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      error:
        exception instanceof Error
          ? exception.message
          : exception['response'] && exception['response']['statusText']
          ? exception['response']['statusText']
          : HttpStatus.INTERNAL_SERVER_ERROR,
      statusCode: httpStatus,
      message:
        exception['response'] && exception['response']['data']
          ? exception['response']['data']['error_description'] ||
            exception['response']['data']['error']
          : null,
    };
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
