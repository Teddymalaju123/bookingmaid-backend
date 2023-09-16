
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDao } from '../dao/user.dao';
import { Feedback } from 'src/entities/feedback';


@Injectable()
export class FeedbackService {
  constructor(
    private readonly userDao: UserDao,
    @InjectRepository(Feedback) private feedBackRepository: Repository<Feedback>,
  ) { }

  findFeed() {
    return this.feedBackRepository.find();
  }

  async createFeed(feedDetails: CreateFeedDto) {
    try {
      const newFeed = this.feedBackRepository.create({
        ...feedDetails,
      });
      return await this.feedBackRepository.save(newFeed);
    } catch (error) {
      throw new Error(error);
    }
  }


  async deleteFeed(feedId: number) {
    try {
      // Find the user by ID
      const feedToDelete = await this.feedBackRepository.findOneById(feedId);

      if (!feedToDelete) {
        throw new Error('ไม่พบรายการการจองคิว');
      }
      // Delete the user
      await this.feedBackRepository.remove(feedToDelete);
      return `รายการการจองคิว ${feedId} ถูกยกเลิกแล้ว.`;
    } catch (error) {
      throw new Error(`ไม่สามารถยกเลิกการจองคิว: ${error.message}`);
    }
  }

  async findUsersWithUserTypes(): Promise<ResUserDto[]> {
    try {
      const usersWithTypes = await this.userDao.findUsersWithUserTypes();
      return usersWithTypes;
    } catch (error) {
      throw new Error(`Failed to fetch users with user types: ${error.message}`);
    }
  }


}




  // deleteUser(id: number) {
  //   return this.userRepository.delete({ id });
  // }




