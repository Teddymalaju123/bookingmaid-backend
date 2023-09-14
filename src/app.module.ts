import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entities/User';
import { UserType } from './entities/UserType';
import { UsersModule } from './module/users/users.module';
import { Booking } from './entities/booking';
import { Feedback } from './entities/feedback';
import { Maidwork } from './entities/maidwork';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'rednossisros.thddns.net',
      port: 7551,
      username: 'teddy',
      password: 'Teddynajaa1',
      database: 'theprivacytaopoon',
      entities: [User, UserType, Maidwork, Feedback, Booking],
      synchronize: false,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
