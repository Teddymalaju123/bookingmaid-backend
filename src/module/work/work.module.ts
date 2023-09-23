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
import { LoginController } from '../auth/controller/login.controller';
import { LoginService } from '../auth/service/login.service';
import { FeedbackDao } from './dao/feedback.dao';
import { MaidworkDao } from './dao/maidwork.dao';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserType, Booking, Feedback, Maidwork])],
  controllers: [UsersController, BooksController, FeedBackController, MaidWorkController, LoginController],
  providers: [UsersService, UserDao, FeedbackDao, BooksService, FeedbackService, MaidWorkService, LoginService, MaidworkDao],
})
export class WorkModule { }
