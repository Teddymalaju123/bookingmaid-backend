
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from 'src/entities/feedback';
import { FeedbackDao } from '../dao/feedback.dao';


@Injectable()
export class FeedbackService {
  constructor(
    private readonly feedbackDao: FeedbackDao,
    @InjectRepository(Feedback) private feedBackRepository: Repository<Feedback>,
  ) { }

  async findFeedback() {
    try {
      const usersWithTypes = await this.feedbackDao.findFeedback();
      return usersWithTypes;
    } catch (error) {
      throw new Error(`Failed to fetch users with user types: ${error.message}`);
    }
  }


  findFeed() {
    return this.feedBackRepository.find();
  }

  async updateStatus(createFeedDto: CreateFeedDto) {
    const feedback = await this.feedBackRepository.findOneById(createFeedDto.feedback_id);
    if (!feedback) {
      throw new Error('Booking not found');
    }
    feedback.status_feedback = createFeedDto.status_feedback;
    const updatedBooking = await this.feedBackRepository.save(feedback);
    return updatedBooking;
  }

  async createFeed(feedDetails: CreateFeedDto) {
    console.log(feedDetails.picture_report);
    try {
      const newFeed = this.feedBackRepository.create({
        ...feedDetails,
      });
      return await this.feedBackRepository.save(newFeed);
    } catch (error) {
      throw new Error(error);
    }
  }

  async editFeed(feedDetails: CreateFeedDto) {
    try {
      const existingFeed = await this.feedBackRepository.findOneById(feedDetails.feedback_id);
      console.log(existingFeed);

      if (!existingFeed) {
        throw new Error('ไม่พบตารางการทำงาน');
      }
      
      existingFeed.feedback_description = feedDetails.feedback_description;

      const updatedMaid = await this.feedBackRepository.save(existingFeed);
      return updatedMaid;
    } catch (error) {
      throw new Error(error.message);
    }
  }


  async deleteFeed(feedId: number) {
    try {
      const feedToDelete = await this.feedBackRepository.findOneById(feedId);
      if (!feedToDelete) {
        throw new Error('ไม่พบรายการการจองคิว');
      }
      await this.feedBackRepository.remove(feedToDelete);
      return `รายการการจองคิว ${feedId} ถูกยกเลิกแล้ว.`;
    } catch (error) {
      throw new Error(`ไม่สามารถยกเลิกการจองคิว: ${error.message}`);
    }
  }
}





