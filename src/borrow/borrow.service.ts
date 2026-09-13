import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Borrow } from './borrow.entity.js';
import { CreateBorrowDto } from './dto/create-borrow.dto.js';
import { ReturnBorrowDto } from './dto/return-borrow.dto.js';
import { BooksService } from '../books/books.service.js';
import { MembersService } from '../members/members.service.js';

@Injectable()
export class BorrowService {
  private borrows: Borrow[] = [];

  constructor(
    private readonly booksService: BooksService,
    private readonly membersService: MembersService,
  ) {}

  getAllBorrows() {
    return this.borrows;
  }

  borrowBook(dto: CreateBorrowDto) {
    const member = this.membersService.getAllMembers().find(m => m.id === dto.memberId);
    if (!member) throw new NotFoundException('Member not found');

    const book = this.booksService.getAllBooks().find(b => b.id === dto.bookId);
    if (!book) throw new NotFoundException('Book not found');

    if (book.availableCopies <= 0) {
      throw new BadRequestException('No available copies');
    }

    book.availableCopies -= 1;

    const borrowDate = new Date("2024-01-01");
    const dueDate = new Date("2024-01-08");

    const borrow: Borrow = {
      id: this.borrows.length + 1,
      memberId: dto.memberId,
      bookId: dto.bookId,
      borrowDate,
      dueDate,
    };

    this.borrows.push(borrow);
    return borrow;
  }

  returnBook(id: number) {
    const borrow = this.borrows.find(b => b.id === id);
    if (!borrow) throw new NotFoundException('Borrow record not found');

    if (borrow.returnDate) {
      throw new BadRequestException('Book already returned');
    }

    borrow.returnDate = new Date(); 

    const book = this.booksService.getAllBooks().find(b => b.id === borrow.bookId);
    if (book) {
      book.availableCopies += 1;
    }

    const diffDays = Math.floor(
      (borrow.returnDate.getTime() - borrow.dueDate.getTime()) /
      (1000 * 60 * 60 * 24)
    );

    borrow.fine = diffDays > 0 ? diffDays * 100 : 0;

    return borrow;
  }
}