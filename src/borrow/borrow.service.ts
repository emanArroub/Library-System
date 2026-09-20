import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateBorrowDto } from './dto/create-borrow.dto.js';

@Injectable()
export class BorrowService {
  constructor(private prisma: PrismaService) {}

async borrowBook(memberId: number, dto: CreateBorrowDto) {
  const { bookId } = dto;

  const book = await this.prisma.book.findUnique({
    where: { id: bookId },
  });

  if (!book) {
    throw new BadRequestException('Book not found');
  }

  if (book.availableCopies <= 0) {
    throw new BadRequestException('No copies available');
  }

  const existingBorrow = await this.prisma.borrow.findFirst({
    where: {
      memberId,
      bookId,
      returned: false,
    },
  });

  if (existingBorrow) {
    throw new BadRequestException('You already borrowed this book');
  }

  const borrowDate = new Date();
  const dueDate = new Date();
  dueDate.setDate(borrowDate.getDate() + 7);

  const borrow = await this.prisma.borrow.create({
    data: {
      memberId,
      bookId,
      borrowDate,
      dueDate,
    },
  });

  await this.prisma.book.update({
    where: { id: bookId },
    data: {
      availableCopies: book.availableCopies - 1,
    },
  });

  return borrow;
}

  async returnBook(memberId: number, borrowId: number) {
    const borrow = await this.prisma.borrow.findUnique({
      where: { id: borrowId },
    });

    if (!borrow) throw new NotFoundException('Borrow not found');

    if (borrow.memberId !== memberId) {
      throw new ForbiddenException('This borrow does not belong to you');
    }

    if (borrow.returned) {
      throw new BadRequestException('Book already returned');
    }

    await this.prisma.book.update({
      where: { id: borrow.bookId },
      data: {
        availableCopies: { increment: 1 },
      },
    });

    const now = new Date();
    const isLate = now > borrow.dueDate;
    const fine = isLate ? 5 : 0;

    return await this.prisma.borrow.update({
      where: { id: borrowId },
      data: {
        returned: true,
        returnDate: now,
        fine,
      },
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