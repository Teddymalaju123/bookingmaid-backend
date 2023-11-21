
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { Booking } from 'src/entities/booking';
import { BookingDao } from '../dao/books.dao';
import { User } from 'src/entities/User';



@Injectable()
export class BooksService {
  constructor(
    private readonly bookDao: BookingDao,
    @InjectRepository(Booking) private bookRepository: Repository<Booking>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }

  findBook() {
    return this.bookRepository.find();
  }

  async findBookByIDBook(booking_id: number): Promise<Booking | null> {
    const resBook: ReBookDto = await this.bookDao.findBookByIDBook(booking_id);
    return resBook;
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

  async findBookByResidentNew(createbookDto: CreateBookDto) {
    const resBook: ReBookDto = await this.bookDao.findBookByResidentNew(createbookDto);
    return resBook;
  }

  async findBookByMaid(createbookDto: CreateBookDto) {
    const resBook: ReBookDto = await this.bookDao.findBookByMaid(createbookDto);
    return resBook;
  }

  async findRating(updateReviewDto: UpdateReviewDto) {
    try {
      const updatedBooking = await this.bookDao.findRating(updateReviewDto);
      return updatedBooking;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Booking not found with ID: ${updateReviewDto}`);
      } else {
        throw new Error(`Error updating booking status: ${error.message}`);
      }
    }
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

  async updateReview(updateReviewDto: UpdateReviewDto) {
    try {
        const booking = await this.bookRepository.findOneById(updateReviewDto.booking_id);
        booking.maid_rating = updateReviewDto.maid_rating;
        const updatedBooking = await this.bookRepository.save(booking);
        const rating = await this.bookDao.findRating(updateReviewDto);
        console.log(rating[0].maid_rating);
        const user = await this.userRepository.findOneById(updateReviewDto.maidbooking);
        user.maid_sumrating = rating[0].maid_rating;
        const updatedUser = await this.userRepository.save(user);
        return updatedBooking;
    } catch (error) {
        if (error instanceof EntityNotFoundError) {
            throw new Error(`Booking not found with ID: ${updateReviewDto.booking_id}`);
        } else {
            throw new Error(`Error updating booking status: ${error.message}`);
        }
    }
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



