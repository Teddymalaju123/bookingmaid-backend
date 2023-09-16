import { UserDao } from './dao/user.dao';
import { UserType } from '../../entities/UserType';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/User';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { Booking } from 'src/entities/booking';
import { BooksController } from './controllers/books.controller';
import { BooksService } from './services/booking.service';
import { Feedback } from 'src/entities/feedback';
import { FeedBackController } from './controllers/feedback.controller';
import { FeedbackService } from './services/feedback.service';
import { Maidwork } from 'src/entities/maidwork';
import { MaidWorkController } from './controllers/maidwork.controller';
import { MaidWorkService } from './services/maidworks.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserType, Booking, Feedback, Maidwork])],
  controllers: [UsersController, BooksController, FeedBackController, MaidWorkController],
  providers: [UsersService, UserDao, BooksService, FeedbackService, MaidWorkService],
})
export class WorkModule { }
