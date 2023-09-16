import { UserDao } from './dao/user.dao';
import { UserType } from '../../entities/UserType';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/User';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserType])],
  controllers: [UsersController],
  providers: [UsersService, UserDao],
})
export class WorkModule { }
