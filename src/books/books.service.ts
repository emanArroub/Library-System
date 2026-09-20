import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateBookDto } from './dto/create-book.dto.js';
import { UpdateBookDto } from './dto/update-book.dto.js';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async getBookById(id: number) {
    const book = await this.prisma.book.findUnique({
      where: { id },
    });

    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  async getAllBooks() {
    return await this.prisma.book.findMany();
  }

  async addBook(dto: CreateBookDto) {
    return await this.prisma.book.create({
      data: {
        title: dto.title,
        author: dto.author,
        totalCopies: dto.totalCopies,
        availableCopies: dto.totalCopies,
      },
    });
  }

  async updateBook(id: number, dto: UpdateBookDto) {
    const book = await this.prisma.book.findUnique({
      where: { id },
    });

    if (!book) throw new NotFoundException('Book not found');

    const borrowedCount = book.totalCopies - book.availableCopies;

    const updated = await this.prisma.book.update({
      where: { id },
      data: {
        title: dto.title ?? book.title,
        author: dto.author ?? book.author,
        totalCopies: dto.totalCopies ?? book.totalCopies,
        availableCopies:
          dto.totalCopies !== undefined
            ? Math.max(dto.totalCopies - borrowedCount, 0)
            : book.availableCopies,
      },
    });

    return updated;
  }

  async deleteBook(id: number) {
    try {
      return await this.prisma.book.delete({
        where: { id },
      });
    } catch {
      throw new NotFoundException('Book not found');
    }
  }
}
