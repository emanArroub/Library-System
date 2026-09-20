import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { BooksModule } from './books/books.module.js';
import { MembersModule } from './members/members.module.js';
import { BorrowModule } from './borrow/borrow.module.js';
import { AuthModule } from './auth/auth.module.js';
import { LoggerMiddleware } from './common/middleware/logger.middleware.js';
import { PrismaModule } from './prisma/prisma.module.js';

@Module({
  imports: [BooksModule, MembersModule, BorrowModule, AuthModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
