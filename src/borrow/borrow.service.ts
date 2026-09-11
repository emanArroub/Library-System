import { Injectable } from '@nestjs/common';
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
    if (!member) return { message: 'Member not found' };

    const book = this.booksService.getAllBooks().find(b => b.id === dto.bookId);
    if (!book) return { message: 'Book not found' };

    if (book.availableCopies <= 0) {
      return { message: 'No available copies' };
    }

    book.availableCopies -= 1;

    const borrow: Borrow = {
    id: this.borrows.length + 1,
    memberId: dto.memberId,
    bookId: dto.bookId,
    borrowDate: new Date(),
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // بعد 7 أيام
};

    this.borrows.push(borrow);
    return borrow;
  }

  returnBook(id: number, dto: ReturnBorrowDto) {
  const borrow = this.borrows.find(b => b.id === id);
  if (!borrow) return { message: 'Borrow record not found' };

  if (borrow.returnDate) {
    return { message: 'Book already returned' };
  }

  borrow.returnDate =new Date(dto.returnDate);

  const book = this.booksService.getAllBooks().find(b => b.id === borrow.bookId);
  if (book) {
    book.availableCopies += 1;
  }

  // حساب التأخير
  const diffDays =
    Math.floor(
      (borrow.returnDate.getTime() - borrow.dueDate.getTime()) /
      (1000 * 60 * 60 * 24) 
    );

  if (diffDays > 0) {
    borrow.fine = diffDays * 100; // الغرامة اليومية = 100
  } else {
    borrow.fine = 0;
  }

  return borrow;
}
}