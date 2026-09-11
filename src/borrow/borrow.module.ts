import { Module } from '@nestjs/common';
import { BorrowService } from './borrow.service.js';
import { BorrowController } from './borrow.controller.js';
import { BooksModule } from '../books/books.module.js';
import { MembersModule } from '../members/members.module.js';

@Module({
  imports: [BooksModule, MembersModule],
  controllers: [BorrowController],
  providers: [BorrowService],
})
export class BorrowModule {}