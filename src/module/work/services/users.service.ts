
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User';
import { Repository } from 'typeorm';
import { UserDao } from '../dao/user.dao';


@Injectable()
export class UsersService {
  constructor(
    private readonly userDao: UserDao,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }

  findUsers() {
    return this.userRepository.find();
  }

  async findMaid(): Promise<ResUserDto[]> {
    try {
      const usersWithTypes = await this.userDao.findMaid();
      return usersWithTypes;
    } catch (error) {
      throw new Error(`Failed to fetch users with user types: ${error.message}`);
    }
  }


  async findResident(): Promise<ResUserDto[]> {
    try {
      const usersWithTypes = await this.userDao.findResident();
      return usersWithTypes;
    } catch (error) {
      throw new Error(`Failed to fetch users with user types: ${error.message}`);
    }
  }

  async findResidentById(id_user: number): Promise<User | null> {
    const resUsers: ResUserDto = await this.userDao.findResidentById(id_user);
    return resUsers;
  }


  async createUser(userDetails: CreateUserDto) {
    try {
      const newUser = this.userRepository.create({
        ...userDetails,
      });
      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new Error(error);
    }
  }

  async editUser(idUser: number, userDetails: CreateUserDto) {
    try {
      const existingUser = await this.userRepository.findOneById(idUser);
      console.log(existingUser);

      if (!existingUser) {
        throw new Error('User not found');
      }

      existingUser.username = userDetails.username;
      existingUser.password = userDetails.password;
      existingUser.fname = userDetails.fname;
      existingUser.lname = userDetails.lname;
      existingUser.phone = userDetails.phone;
      existingUser.birthday = userDetails.birthday;
      existingUser.address = userDetails.address;

      const updatedUser = await this.userRepository.save(existingUser);
      return updatedUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async editRating(idUser: number, userDetails: CreateUserDto) {
    try {
      const existingUser = await this.userRepository.findOneById(idUser);
      console.log(existingUser);

      if (!existingUser) {
        throw new Error('User not found');
      }
      existingUser.maid_sumrating = userDetails.maid_sumrating;
      const updatedUser = await this.userRepository.save(existingUser);
      return updatedUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteUser(userId: number) {
    try {
      const userToDelete = await this.userRepository.findOneById(userId);
      if (!userToDelete) {
        throw new Error('User not found');
      }
      await this.userRepository.remove(userToDelete);
      return `User with ID ${userId} has been deleted successfully.`;
    } catch (error) {
      throw new Error(`Failed to delete user: ${error.message}`);
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








