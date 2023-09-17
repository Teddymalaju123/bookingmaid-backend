
interface CreateBookDto {
  booking_id: number;
  booking_date: Date;
  work_hour: Date;
  service_price: number;
  paymentslip: Buffer;
  maid_rating: number;
  status: string;
  user_booking: number;
  maidbooking: number;
}