import { Controller, Post, Delete, Body, Param, HttpException, HttpStatus, Get } from '@nestjs/common';
import { FeedbackService } from '../services/feedback.service';


@Controller('feedback')
export class FeedBackController {
  constructor(private feedbackService: FeedbackService) { }

  @Get('/getfeed')
  async findFeedback() {
    return this.feedbackService.findFeedback()
  }


  @Post('/savefeed')
  async createFeed(@Body() createFeedDto: CreateFeedDto) {
    try {
      const newFeed = await this.feedbackService.createFeed(createFeedDto);
      return newFeed;
    } catch (error) {
      throw new HttpException(
        'ไม่สามารถจองคิวได้.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/update-status')
  async updateStatus(
    @Body() createFeedDto: CreateFeedDto,
  ) {
    try {
      const updatedBooking = await this.feedbackService.updateStatus(createFeedDto);
      return updatedBooking;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Booking not found with ID: ${createFeedDto.feedback_id}`);
      } else {
        throw new Error(`Error updating booking status: ${error.message}`);
      }
    }
  }

  @Delete('/deletefeed/:id')
  async deleteFeed(@Param('id') feedId: string) {
    try {
      const feedid = parseInt(feedId, 10);
      const result = await this.feedbackService.deleteFeed(feedid);
      return { message: result };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


}
