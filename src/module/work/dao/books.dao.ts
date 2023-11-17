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
    async findBookByResident(createbookDto: CreateBookDto) {
        try {
            const query = `
            SELECT booking.*, user.*,status_type.*
            FROM booking
            JOIN user ON booking.maidbooking = user.id_user
            Join status_type ON booking.status = status_type.id_status
            WHERE booking.user_booking = ? and booking.status = ?`;
            const results = await this.bookingRepository.query(query, [createbookDto.user_booking, createbookDto.status]);

            if (!results || results.length === 0) {
                throw new NotFoundException('ไม่พบข้อมูลการจองสำหรับผู้ใช้รหัส ' + createbookDto.user_booking);
            }

            return results;
        } catch (error) {
            throw new Error(`เกิดข้อผิดพลาดในการค้นหาข้อมูลการจอง: ${error.message}`);
        }
    }

    async findBookByIDBook(booking_id: number) {
        try {
            const query = `
            SELECT *
            FROM booking
            JOIN user ON booking.maidbooking = user.id_user
            Join status_type ON booking.status = status_type.id_status
            Join feedback ON booking.booking_id = feedback.id_booking
            WHERE booking.booking_id = ?;`;
            const results = await this.bookingRepository.query(query, [booking_id]);

            if (!results || results.length === 0) {
                throw new NotFoundException('ไม่พบข้อมูลการจองสำหรับผู้ใช้รหัส ' + booking_id);
            }

            return results;
        } catch (error) {
            throw new Error(`เกิดข้อผิดพลาดในการค้นหาข้อมูลการจอง: ${error.message}`);
        }
    }

    async findBookByIDResident(booking_id: number) {
        try {
            const query = `
            SELECT *
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

    async findBookByIMaid(booking_id: number) {
        try {
            const query = `
            SELECT *
            FROM booking
            JOIN user ON booking.user_booking = user.id_user
            Join status_type ON booking.status = status_type.id_status
            WHERE booking.maidbooking = ?`;
            const results = await this.bookingRepository.query(query, [booking_id]);

            if (!results || results.length === 0) {
                throw new NotFoundException('ไม่พบข้อมูลการจองสำหรับผู้ใช้รหัส ' + booking_id);
            }

            return results;
        } catch (error) {
            throw new Error(`เกิดข้อผิดพลาดในการค้นหาข้อมูลการจอง: ${error.message}`);
        }
    }

    async getBooksinfo(createbookDto: CreateBookDto) {
        try {
            const query = `
            SELECT booking.*, user.*,status_type.*
            FROM booking
            JOIN user ON booking.maidbooking = user.id_user
            Join status_type ON booking.status = status_type.id_status
            WHERE booking.user_booking = ?  and booking.booking_id = ?`;
            const results = await this.bookingRepository.query(query, [createbookDto.user_booking, createbookDto.booking_id]);

            if (!results || results.length === 0) {
                throw new NotFoundException('ไม่พบข้อมูลการจองสำหรับผู้ใช้รหัส ' + createbookDto.user_booking);
            }

            return results;
        } catch (error) {
            throw new Error(`เกิดข้อผิดพลาดในการค้นหาข้อมูลการจอง: ${error.message}`);
        }
    }


    async findBookByResidentNew(createbookDto: CreateBookDto) {
        try {
            const query = `
            SELECT booking.*, user.*, status_type.*
            FROM booking
            JOIN user ON booking.maidbooking = user.id_user
            JOIN status_type ON booking.status = status_type.id_status
            WHERE booking.user_booking = ? AND booking.status = 1
            ORDER BY booking.booking_id DESC
            LIMIT 1;`;
            const results = await this.bookingRepository.query(query, [createbookDto.user_booking, createbookDto.status]);

            if (!results || results.length === 0) {
                throw new NotFoundException('ไม่พบข้อมูลการจองสำหรับผู้ใช้รหัส ' + createbookDto.user_booking);
            }

            return results;
        } catch (error) {
            throw new Error(`เกิดข้อผิดพลาดในการค้นหาข้อมูลการจอง: ${error.message}`);
        }
    }

    async findBookByMaid(createbookDto: CreateBookDto) {
        try {
            const query = `
            SELECT booking.*, user.*, status_type.*
            FROM booking
            JOIN user ON booking.maidbooking = user.id_user
            JOIN status_type ON booking.status = status_type.id_status
            WHERE booking.maidbooking = ? AND booking.status = ?;`;
            const results = await this.bookingRepository.query(query, [createbookDto.maidbooking, createbookDto.status]);

            if (!results || results.length === 0) {
                throw new NotFoundException('ไม่พบข้อมูลการจองสำหรับผู้ใช้รหัส ' + createbookDto.maidbooking);
            }

            return results;
        } catch (error) {
            throw new Error(`เกิดข้อผิดพลาดในการค้นหาข้อมูลการจอง: ${error.message}`);
        }
    }

    async findRating(updateReviewDto: UpdateReviewDto) {
        try {
            const query = `
            SELECT AVG(booking.maid_rating) AS maid_rating
            FROM booking
            WHERE booking.maidbooking = ? and booking.maid_rating IS NOT NULL;`;
            const results = await this.bookingRepository.query(query, [updateReviewDto.maidbooking]);

            if (!results || results.length === 0) {
                throw new NotFoundException('ไม่พบข้อมูลการจองสำหรับผู้ใช้รหัส ' + updateReviewDto.maidbooking);
            }

            return results;
        } catch (error) {
            throw new Error(`เกิดข้อผิดพลาดในการค้นหาข้อมูลการจอง: ${error.message}`);
        }
    }

    async getBooksMaidinfo(createbookDto: CreateBookDto) {
        try {
            const query = `
            SELECT booking.*, user.*,status_type.*
            FROM booking
            JOIN user ON booking.user_booking = user.id_user
            Join status_type ON booking.status = status_type.id_status
            WHERE booking.maidbooking = ?  and booking.booking_id = ?`;
            const results = await this.bookingRepository.query(query, [createbookDto.maidbooking, createbookDto.booking_id]);

            if (!results || results.length === 0) {
                throw new NotFoundException('ไม่พบข้อมูลการจองสำหรับผู้ใช้รหัส ' + createbookDto.user_booking);
            }

            return results;
        } catch (error) {
            throw new Error(`เกิดข้อผิดพลาดในการค้นหาข้อมูลการจอง: ${error.message}`);
        }
    }

}
