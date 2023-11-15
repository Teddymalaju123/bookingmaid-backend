
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDao } from '../dao/user.dao';
import { Booking } from 'src/entities/booking';
import { BookingDao } from '../dao/books.dao';


@Injectable()
export class BooksService {
  constructor(
    private readonly bookDao: BookingDao,
    @InjectRepository(Booking) private bookRepository: Repository<Booking>,
  ) { }

  findBook() {
    return this.bookRepository.find();
  }


  async findBookByResident(createbookDto: CreateBookDto) {
    const resBook: ReBookDto = await this.bookDao.findBookByResident(createbookDto);
    return resBook;
  }

  async findBookByIDResident(booking_id: number): Promise<Booking | null> {
    const resBook: ReBookDto = await this.bookDao.findBookByIDResident(booking_id);
    return resBook;
  }

  async findBookByIMaid(booking_id: number): Promise<Booking | null> {
    const resBook: ReBookDto = await this.bookDao.findBookByIMaid(booking_id);
    return resBook;
  }

  async findBookinfo(createbookDto: CreateBookDto) {
    const resBook: ReBookDto = await this.bookDao.getBooksinfo(createbookDto);
    return resBook;
  }

  async findBookByResidentNew(booking_id: number): Promise<Booking | null> {
    const resBook: ReBookDto = await this.bookDao.findBookByResidentNew(booking_id);
    return resBook;
  }

  async findBookByMaid(createbookDto: CreateBookDto) {
    const resBook: ReBookDto = await this.bookDao.findBookByMaid(createbookDto);
    return resBook;
  }

  async updateStatus(updateStatusDto: UpdateStatusDto): Promise<Booking> {
    const booking = await this.bookRepository.findOneById(updateStatusDto.booking_id);
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    booking.status = updateStatusDto.status;
    const updatedBooking = await this.bookRepository.save(booking);
    return updatedBooking;
  }

  async updateSlip(updateSlipDto: UpdateSlipDto): Promise<Booking> {
    const booking = await this.bookRepository.findOneById(updateSlipDto.booking_id);
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    booking.paymentslip = updateSlipDto.paymentslip;
    booking.status = updateSlipDto.status;
    const updatedBooking = await this.bookRepository.save(booking);
    return updatedBooking;
  }

  async updateReview(updateReviewDto: UpdateReviewDto): Promise<Booking> {
    const booking = await this.bookRepository.findOneById(updateReviewDto.booking_id);
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    booking.maid_rating = updateReviewDto.maid_rating;
    const updatedBooking = await this.bookRepository.save(booking);
    return updatedBooking;
  }

  async findBookMaidinfo(createbookDto: CreateBookDto) {
    const resBook: ReBookDto = await this.bookDao.getBooksMaidinfo(createbookDto);
    return resBook;
  }

  async createBook(bookDetails: CreateBookDto) {
    try {
      const newBook = this.bookRepository.create({
        ...bookDetails,
      });
      return await this.bookRepository.save(newBook);
    } catch (error) {
      throw new Error(error);
    }
  }


  async deleteBook(bookId: number) {
    try {
      const bookToDelete = await this.bookRepository.findOneById(bookId);
      if (!bookToDelete) {
        throw new Error('ไม่พบรายการการจองคิว');
      }
      await this.bookRepository.remove(bookToDelete);
      return `รายการการจองคิว ${bookId} ถูกยกเลิกแล้ว.`;
    } catch (error) {
      throw new Error(`ไม่สามารถยกเลิกการจองคิว: ${error.message}`);
    }
  }

}



