import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter.js';
import { LibraryExceptionFilter } from './common/filters/library-exception.filter.js';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor.js';
import { initDatabase } from './database/init-db.js';

async function bootstrap() {
  initDatabase();
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new LibraryExceptionFilter());

  app.useGlobalInterceptors(new LoggingInterceptor());


  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform : true,
  }));



  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
