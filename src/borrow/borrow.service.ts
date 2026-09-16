import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { Borrow } from '../common/interfaces/borrow.interface.js';
import { BooksService } from '../books/books.service.js';
import { MembersService } from '../members/members.service.js';

@Injectable()
export class BorrowService {
  private borrowed: Borrow[] = [];
  private nextId = 1;

  constructor(
    private readonly booksService: BooksService,
    private readonly membersService: MembersService,
  ) {}

  borrowBook(memberId: number, bookId: number) {
    const member = this.membersService.getMemberById(memberId);
    if (!member) throw new NotFoundException('Member not found');

    const book = this.booksService.getBookById(bookId);
    if (!book) throw new NotFoundException('Book not found');

    if (book.availableCopies <= 0)
      throw new BadRequestException('No available copies');

    book.availableCopies -= 1;

    const borrow: Borrow = {
      id: this.nextId++,
      memberId,
      bookId,
      borrowDate: new Date(),
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      returned: false,
    };

    this.borrowed.push(borrow);
    return borrow;
  }

  returnBook(memberId: number, borrowId: number) {
    const borrow = this.borrowed.find((b) => b.id === borrowId);

    if (!borrow) throw new NotFoundException('Borrow not found');

    if (borrow.memberId !== memberId)
      throw new ForbiddenException('This borrow does not belong to you');

    borrow.returned = true;

    const book = this.booksService.getBookById(borrow.bookId);
    if (!book) throw new NotFoundException('Book not found');
    book.availableCopies += 1;

    return borrow;
  }
}