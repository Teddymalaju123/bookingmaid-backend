
import { Injectable } from '@nestjs/common';
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

  async findBookByMaid(): Promise<ResUserDto[]> {
    try {
      const usersWithTypes = await this.bookDao.findBookByMaid();
      return usersWithTypes;
    } catch (error) {
      throw new Error(`Failed to fetch users with user types: ${error.message}`);
    }
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



