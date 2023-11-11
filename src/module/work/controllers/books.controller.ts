import { Controller, Post, Delete, Body, Param, HttpException, HttpStatus, Get, NotFoundException } from '@nestjs/common';
import { BooksService } from '../services/booking.service';


@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) { }


  @Get("/get")
  getBooks() {
    return this.bookService.findBook();
  }

  @Post("/get-book-resident")
  async getBooksresident(@Body() createbookDto: CreateBookDto) {
    try {
    const booking = await this.bookService.findBookByResident(createbookDto);
    return booking;
  } catch (error) {
    throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
  }

  @Get("/get-book-idresident/:idbook")
  async getBookIDsresidentNew(@Param('idbook') booking_id: number) {
    const booking = await this.bookService.findBookByIDResident(booking_id);
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    return booking;
  }

  @Get("/get-book-idMaid/:idbook")
  async getBookIDMaid(@Param('idbook') booking_id: number) {
    const booking = await this.bookService.findBookByIMaid(booking_id);
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    return booking;
  }

  @Post("/get-book-info")
  async getBooksinfo(@Body() createbookDto: CreateBookDto) {
    try {
    const booking = await this.bookService.findBookinfo(createbookDto);
    return booking;
  } catch (error) {
    throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
  }

 
  @Get("/get-book-residentnew/:idbook")
  async getBooksresidentNew(@Param('idbook') booking_id: number) {
    const booking = await this.bookService.findBookByResidentNew(booking_id);
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    return booking;
  }

  @Post("/get-book-maid")
  async getBooksMaid(@Body() createbookDto: CreateBookDto) {
    const booking = await this.bookService.findBookByMaid(createbookDto);
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    return booking;
  }

  @Post("/get-bookmaid-info")
  async getBooksMaidinfo(@Body() createbookDto: CreateBookDto) {
    try {
    const booking = await this.bookService.findBookMaidinfo(createbookDto);
    return booking;
  } catch (error) {
    throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
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
