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
            const results = await this.bookingRepository.query(query, [createbookDto.user_booking,createbookDto.status]);

            if (!results || results.length === 0) {
                throw new NotFoundException('ไม่พบข้อมูลการจองสำหรับผู้ใช้รหัส ' + createbookDto.user_booking);
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
            const results = await this.bookingRepository.query(query, [createbookDto.user_booking,createbookDto.booking_id]);

            if (!results || results.length === 0) {
                throw new NotFoundException('ไม่พบข้อมูลการจองสำหรับผู้ใช้รหัส ' + createbookDto.user_booking);
            }

            return results;
        } catch (error) {
            throw new Error(`เกิดข้อผิดพลาดในการค้นหาข้อมูลการจอง: ${error.message}`);
        }
    }


    async findBookByResidentNew(booking_id: number) {
        try {
            const query = `
            SELECT booking.*, user.*,status_type.*
            FROM booking
            JOIN user ON booking.maidbooking = user.id_user
            Join status_type ON booking.status = status_type.id_status
            WHERE booking.user_booking = ? AND booking.booking_date = (SELECT MAX(booking_date) FROM booking);`;
            const results = await this.bookingRepository.query(query, [booking_id]);

            if (!results || results.length === 0) {
                throw new NotFoundException('ไม่พบข้อมูลการจองสำหรับผู้ใช้รหัส ' + booking_id);
            }

            return results;
        } catch (error) {
            throw new Error(`เกิดข้อผิดพลาดในการค้นหาข้อมูลการจอง: ${error.message}`);
        }
    }

    async findBookByMaid(createbookDto: CreateBookDto) {
        try {
            const query = `
            SELECT booking.*, user.*,status_type.*
            FROM booking
            JOIN user ON booking.user_booking = user.id_user
            Join status_type ON booking.status = status_type.id_status
            WHERE booking.maidbooking = ? and booking.status = ?;`;
            const results = await this.bookingRepository.query(query, [createbookDto.maidbooking,createbookDto.status]);

            if (!results || results.length === 0) {
                throw new NotFoundException('ไม่พบข้อมูลการจองสำหรับผู้ใช้รหัส ' + createbookDto.maidbooking);
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
            const results = await this.bookingRepository.query(query, [createbookDto.maidbooking,createbookDto.booking_id]);

            if (!results || results.length === 0) {
                throw new NotFoundException('ไม่พบข้อมูลการจองสำหรับผู้ใช้รหัส ' + createbookDto.user_booking);
            }

            return results;
        } catch (error) {
            throw new Error(`เกิดข้อผิดพลาดในการค้นหาข้อมูลการจอง: ${error.message}`);
        }
    }

}
