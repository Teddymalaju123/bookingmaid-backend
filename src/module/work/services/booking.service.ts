
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { Booking } from 'src/entities/booking';
import { BookingDao } from '../dao/books.dao';
import { User } from 'src/entities/User';
import { format, utcToZonedTime } from 'date-fns-tz';



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
    const updatedExistingWork = resBook.map((item, index) => {
      const utcDate = new Date(item.booking_date);
      const timeZone = 'Asia/Bangkok';

      const zonedDate = utcToZonedTime(utcDate, timeZone);
      const formattedDate = format(zonedDate, 'yyyy-MM-dd HH:mm:ssXXX', { timeZone });

      return { ...item, booking_date: formattedDate };
    });

    return updatedExistingWork;
  }

  async findBookByIDResident(booking_id: number): Promise<Booking | null> {
    const resBook: ReBookDto = await this.bookDao.findBookByIDResident(booking_id);
    const updatedExistingWork = resBook.map((item, index) => {
      const utcDate = new Date(item.booking_date);
      const timeZone = 'Asia/Bangkok';

      const zonedDate = utcToZonedTime(utcDate, timeZone);
      const formattedDate = format(zonedDate, 'yyyy-MM-dd HH:mm:ssXXX', { timeZone });

      return { ...item, booking_date: formattedDate };
    });

    return updatedExistingWork;
  }

  async findBookByIMaid(booking_id: number): Promise<Booking | null> {
    const resBook: ReBookDto = await this.bookDao.findBookByIMaid(booking_id);
    const updatedExistingWork = resBook.map((item, index) => {
      const utcDate = new Date(item.booking_date);
      const timeZone = 'Asia/Bangkok';

      const zonedDate = utcToZonedTime(utcDate, timeZone);
      const formattedDate = format(zonedDate, 'yyyy-MM-dd HH:mm:ssXXX', { timeZone });

      return { ...item, booking_date: formattedDate };
    });

    return updatedExistingWork;
  }

  async findBookinfo(createbookDto: CreateBookDto) {
    const resBook: ReBookDto = await this.bookDao.getBooksinfo(createbookDto);
    const updatedExistingWork = resBook.map((item, index) => {
      const utcDate = new Date(item.booking_date);
      const timeZone = 'Asia/Bangkok';

      const zonedDate = utcToZonedTime(utcDate, timeZone);
      const formattedDate = format(zonedDate, 'yyyy-MM-dd HH:mm:ssXXX', { timeZone });

      return { ...item, booking_date: formattedDate };
    });

    return updatedExistingWork;
  }

  async findBookByResidentNew(createbookDto: CreateBookDto) {
    const resBook: ReBookDto = await this.bookDao.findBookByResidentNew(createbookDto);
    const updatedExistingWork = resBook.map((item, index) => {
      const utcDate = new Date(item.booking_date);
      const timeZone = 'Asia/Bangkok';

      const zonedDate = utcToZonedTime(utcDate, timeZone);
      const formattedDate = format(zonedDate, 'yyyy-MM-dd HH:mm:ssXXX', { timeZone });

      return { ...item, booking_date: formattedDate };
    });

    return updatedExistingWork;
  }

  async findBookByMaid(createbookDto: CreateBookDto) {
    const resBook: ReBookDto = await this.bookDao.findBookByMaid(createbookDto);
    const updatedExistingWork = resBook.map((item, index) => {
      const utcDate = new Date(item.booking_date);
      const timeZone = 'Asia/Bangkok';

      const zonedDate = utcToZonedTime(utcDate, timeZone);
      const formattedDate = format(zonedDate, 'yyyy-MM-dd HH:mm:ssXXX', { timeZone });

      return { ...item, booking_date: formattedDate };
    });

    return updatedExistingWork;
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

async editBook(createBookDto: CreateBookDto): Promise<Booking> {
  const booking = await this.bookRepository.findOneById(createBookDto.booking_id);
  if (!booking) {
    throw new NotFoundException('Booking not found');
  }
  booking.booking_date = createBookDto.booking_date;
  booking.work_hour = createBookDto.work_hour;
  booking.start_work = createBookDto.start_work;
  booking.service_price = createBookDto.service_price;
  booking.descriptmaid = createBookDto.descriptmaid;
  const updatedBooking = await this.bookRepository.save(booking);
  return updatedBooking;
}


  async findBookMaidinfo(createbookDto: CreateBookDto) {
    const resBook: ReBookDto = await this.bookDao.getBooksMaidinfo(createbookDto);
    const updatedExistingWork = resBook.map((item, index) => {
      const utcDate = new Date(item.booking_date);
      const timeZone = 'Asia/Bangkok';

      const zonedDate = utcToZonedTime(utcDate, timeZone);
      const formattedDate = format(zonedDate, 'yyyy-MM-dd HH:mm:ssXXX', { timeZone });

      return { ...item, day: formattedDate };
    });

    return updatedExistingWork;
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



