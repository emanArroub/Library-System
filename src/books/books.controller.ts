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
  getAllBooks() {
    return this.bookService.getAllBooks();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('librarian')
  @Post()
  addBook(@Body() dto: CreateBookDto) {
    return this.bookService.addBook(dto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('librarian')
  @Put(':id')
  updateBook(@Param('id') id: number, @Body() dto: UpdateBookDto) {
    return this.bookService.updateBook(id, dto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('librarian')
  @Delete(':id')
  deleteBook(@Param('id') id: number) {
    return this.bookService.deleteBook(id);
  }
}
