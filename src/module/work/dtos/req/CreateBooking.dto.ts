
interface CreateBookDto {
  booking_id: number;
  booking_date: Date;
  work_hour: number;
  start_work: Date;
  service_price: number;
  paymentslip: Buffer;
  maid_rating: number;
  status: number;
  descriptmaid: string;
  user_booking: number;
  maidbooking: number;
  id_maidwork: number;
  sumRating: number;
}