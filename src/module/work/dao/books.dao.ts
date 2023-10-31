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
    async findBookByResident(booking_id: number) {
        try {
            const query = `
            SELECT booking.*, user.*,status_type.*
            FROM booking
            JOIN user ON booking.maidbooking = user.id_user
            Join status_type ON booking.status = status_type.id_status
            WHERE booking.user_booking = ?`;
            const results = await this.bookingRepository.query(query, [booking_id]);

            if (!results || results.length === 0) {
                throw new NotFoundException('ไม่พบข้อมูลการจองสำหรับผู้ใช้รหัส ' + booking_id);
            }

            return results;
        } catch (error) {
            throw new Error(`เกิดข้อผิดพลาดในการค้นหาข้อมูลการจอง: ${error.message}`);
        }
    }

    async findBookByMaid(maid_id: number) {
        try {
            const query = `
            SELECT booking.*, user.*,status_type.*
            FROM booking
            JOIN user ON booking.user_booking = user.id_user
            Join status_type ON booking.status = status_type.id_status
            WHERE booking.maidbooking = ?`;
            const results = await this.bookingRepository.query(query, [maid_id]);

            if (!results || results.length === 0) {
                throw new NotFoundException('ไม่พบข้อมูลการจองสำหรับผู้ใช้รหัส ' + maid_id);
            }

            return results;
        } catch (error) {
            throw new Error(`เกิดข้อผิดพลาดในการค้นหาข้อมูลการจอง: ${error.message}`);
        }
    }

}
