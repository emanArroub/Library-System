import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    const res = exception.getResponse();

    response.status(status).json({
      error: 'Library Error',
      message:
        typeof res === 'object' && res !== null
          ? (res as any).message
          : exception.message,
      status,
      timestamp: new Date().toISOString(),
    });
  }
}
