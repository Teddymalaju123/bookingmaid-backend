import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'booking' })
export class Booking {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  booking_id: number;

  @Column({ type: 'datetime' })
  booking_date: Date;

  @Column({ type: 'datetime' })
  work_hour: Date;

  @Column()
  service_price: number;

  @Column({ type: 'longblob' }) 
  paymentslip: Buffer;

  @Column()
  maid_rating: number;

  @Column()
  status: string;

  @Column()
  user_booking: number;

  @Column()
  maidbooking: number;
}
