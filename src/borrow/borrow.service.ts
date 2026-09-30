import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class BorrowService {
  constructor(private prisma: PrismaService) {}

  async borrowBook(memberId: number, bookId: number) {
    return this.prisma.$transaction(async (tx) => {
      const book = await tx.book.findUnique({
        where: { id: bookId },
      });

      if (!book) {
        throw new NotFoundException('Book not found');
      }

      if (book.availableCopies < 1) {
        throw new BadRequestException('No copies available');
      }

      const existingBorrow = await tx.borrow.findFirst({
        where: {
          memberId,
          bookId,
          returned: false,
        },
      });

      if (existingBorrow) {
        throw new BadRequestException(
          'You already borrowed this book',
        );
      }

      const updatedBook = await tx.book.updateMany({
        where: {
          id: bookId,
          availableCopies: {
            gt: 0,
          },
        },
        data: {
          availableCopies: {
            decrement: 1,
          },
        },
      });

      if (updatedBook.count === 0) {
        throw new BadRequestException('No copies available');
      }

      const borrow = await tx.borrow.create({
        data: {
          memberId,
          bookId,
          dueDate: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000,
          ),
        },
      });

      return borrow;
    });
  }

  async returnBook(memberId: number, borrowId: number) {
    return this.prisma.$transaction(async (tx) => {
      const borrow = await tx.borrow.findUnique({
        where: { id: borrowId },
      });

      if (!borrow) {
        throw new NotFoundException('Borrow not found');
      }

      if (borrow.memberId !== memberId) {
        throw new ForbiddenException(
          'This borrow does not belong to you',
        );
      }

      if (borrow.returned) {
        throw new BadRequestException('Book already returned');
      }

      await tx.book.update({
        where: { id: borrow.bookId },
        data: {
          availableCopies: {
            increment: 1,
          },
        },
      });

      const now = new Date();
      const isLate = now > borrow.dueDate;
      const fine = isLate ? 5 : 0;

      return await tx.borrow.update({
        where: { id: borrowId },
        data: {
          returned: true,
          returnDate: now,
          fine,
        },
      });
    });
  }

  async getAllBorrows() {
    return await this.prisma.borrow.findMany({
      include: {
        member: true,
        book: true,
      },
    });
  }
}