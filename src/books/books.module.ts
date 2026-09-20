import { Module } from '@nestjs/common';
import { BooksController } from './books.controller.js';
import { BooksService } from './books.service.js';
import { MembersModule } from '../members/members.module.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [MembersModule , PrismaModule],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}
