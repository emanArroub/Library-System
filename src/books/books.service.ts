import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './book.entity.js';
import { CreateBookDto } from './dto/create-book.dto.js';
import {UpdateBookDto} from './dto/update-book.dto.js'
@Injectable()
export class BooksService {
    private books: Book[] = []; 

    getAllBooks() {
        return this.books;
    }

    addBook(dto : CreateBookDto) {
        const book : Book = {
            id  : this.books.length + 1,
            title : dto.title,
            author : dto.author,
            totalCopies : dto.totalCopies,
            availableCopies : dto.totalCopies,
        };
        this.books.push(book);
        return book;
    }

updateBook(id: number, dto: UpdateBookDto) {
  const book = this.books.find(b => b.id === id);
  if (!book) throw new NotFoundException('Book not found');

  Object.assign(book, dto);

  if (dto.totalCopies !== undefined) {
    const borrowedCount = book.totalCopies - book.availableCopies;
    book.availableCopies = dto.totalCopies - borrowedCount;

    if (book.availableCopies < 0) {
      book.availableCopies = 0;
    }
  }

  return book;
}
    deleteBook(id:number){
        const index = this.books.findIndex(b => b.id === id)
        if (index === -1) return { message : 'Book not found'}
        const deleted = this.books[index]
        this.books.splice(index,1)  
        return deleted
    }

}
