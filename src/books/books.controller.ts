import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service.js';
import { CreateBookDto } from './dto/create-book.dto.js';
import { UpdateBookDto } from './dto/update-book.dto.js';
import { AuthGuard } from '../common/guards/auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Get()
  async getAllBooks() {
    return await this.bookService.getAllBooks();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('librarian')
  @Post()
  async addBook(@Body() dto: CreateBookDto) {
    return await this.bookService.addBook(dto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('librarian')
  @Put(':id')
  async updateBook(@Param('id') id: number, @Body() dto: UpdateBookDto) {
    return await this.bookService.updateBook(id, dto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('librarian')
  @Delete(':id')
  async deleteBook(@Param('id') id: number) {
    return await this.bookService.deleteBook(id);
  }
}