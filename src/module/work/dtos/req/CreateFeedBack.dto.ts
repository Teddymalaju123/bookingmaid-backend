
interface CreateFeedDto {
  feedback_id: number;
  feedback_description: string;
  picture_report: Buffer;
  id_user: number;
  id_booking: number;
  status_feedback: number;
}