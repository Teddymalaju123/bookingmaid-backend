import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from 'src/entities/booking';
import { Repository } from 'typeorm';


@Injectable()
export class BookingDao {
    constructor(
        @InjectRepository(Booking)
        private readonly bookingRepository: Repository<Booking>,
    ) { }
    async findBookByMaid() {
        try {
            const query = ` SELECT * FROM booking join user on booking.user_booking = user.id_user WHERE user.id_user `;
            const results = await this.bookingRepository.query(query);
            if (!results || results.length === 0) {
                throw new NotFoundException('Failed');
            }
            return results;
        } catch (error) {
            throw new Error(`Failed : ${error.message}`);
        }
    }




}
