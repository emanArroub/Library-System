import { Module } from '@nestjs/common';
import { BorrowService } from './borrow.service.js';
import { BorrowController } from './borrow.controller.js';
import { BooksModule } from '../books/books.module.js';
import { MembersModule } from '../members/members.module.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [BooksModule, MembersModule,PrismaModule],
  controllers: [BorrowController],
  providers: [BorrowService],
})
export class BorrowModule {}
