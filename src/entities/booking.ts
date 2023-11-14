import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'booking' })
export class Booking {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  booking_id: number;

  @Column({ type: 'date' })
  booking_date: Date;

  @Column()
  work_hour: number;

  @Column({ type: 'time' })
  start_work: Date;

  @Column()
  descriptmaid: string;

  @Column()
  service_price: number;

  @Column({ type: 'longblob' }) 
  paymentslip: Buffer;

  @Column({ type: 'decimal' })
  maid_rating: number;

  @Column()
  status: number;

  @Column()
  user_booking: number;

  @Column()
  maidbooking: number;
}
