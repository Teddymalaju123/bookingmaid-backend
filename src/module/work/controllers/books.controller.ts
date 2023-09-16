import { Controller, Post, Delete, Body, Param, HttpException, HttpStatus, Get } from '@nestjs/common';
import { BooksService } from '../services/booking.service';


@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) { }

  @Get('/users-with-types')
  async findUsersWithUserTypes() {
    return this.bookService.findUsersWithUserTypes();
  }


  @Get("/get")
  getBooks() {
    return this.bookService.findBook();
  }

  @Post('/save')
  async createBook(@Body() createBookDto: CreateBookDto) {
    try {
      const newBook = await this.bookService.createBook(createBookDto);
      return newBook;
    } catch (error) {
      throw new HttpException(
        'ไม่สามารถจองคิวได้.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('/delete/:id')
  async deleteBook(@Param('id') bookId: string) {
    try {
      const bookid = parseInt(bookId, 10);
      const result = await this.bookService.deleteBook(bookid);
      return { message: result };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


}
