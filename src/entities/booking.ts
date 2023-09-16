import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserType } from './UserType';

@Entity({ name: 'booking' })
export class Booking {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  booking_id: number;

  @Column()
  booking_date: Date;

  @Column()
  work_hour: Date;

  @Column()
  service_price: number;

  @Column({ type: 'blob'})
  paymentslip: Blob;

  @Column()
  maid_rating: number;

  @Column()
  status: string;

  @Column()
  user_booking: number;

  @Column()
  maidbooking: number;
}
