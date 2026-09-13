import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service.js';
import { Book } from './book.entity.js'
import { CreateBookDto } from './dto/create-book.dto.js';
import {UpdateBookDto} from './dto/update-book.dto.js'
import { AuthController } from '../auth/auth.controller.js';
import { AuthGuard } from '../common/guards/auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';


@Controller('books')
@UseGuards(AuthGuard,RolesGuard)

export class BooksController {
   constructor(private readonly bookService: BooksService) {}
   @Get()
   getAllBooks() {
      return this.bookService.getAllBooks();
   }
   @Roles('librarian')
   @Post()
   addBook(@Body() dto: CreateBookDto){
      return this.bookService.addBook(dto)
   }

   @Put(':id')
   @Roles('librarian')
   updateBook(@Param('id') id:number, @Body() dto: UpdateBookDto){
      return this.bookService.updateBook(id,dto)
   }

   @Delete(':id')
   @Roles('librarian')
   deleteBook(@Param('id') id : number){
      return this.bookService.deleteBook(id)
   }


}
