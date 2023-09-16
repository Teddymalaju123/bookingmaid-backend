import { Controller, Post, Delete, Body, Param, HttpException, HttpStatus, Get } from '@nestjs/common';
import { FeedbackService } from '../services/feedback.service';


@Controller('feedback')
export class FeedBackController {
  constructor(private feedbackService: FeedbackService) { }

  @Get('/users-with-types')
  async findUsersWithUserTypes() {
    return this.feedbackService.findUsersWithUserTypes();
  }


  @Get("/getfeed")
  getBooks() {
    return this.feedbackService.findFeed();
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
