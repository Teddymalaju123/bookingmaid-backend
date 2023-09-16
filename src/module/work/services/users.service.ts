
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

  async editUser(userDetails: CreateUserDto) {
    try {
      const existingUser = await this.userRepository.findOneById(userDetails.id_user);
      console.log(existingUser);

      if (!existingUser) {
        throw new Error('User not found');
      }
      existingUser.username = userDetails.username;
      existingUser.password = userDetails.password;
      existingUser.fname = userDetails.fname;
      return await this.userRepository.save(existingUser);
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteUser(userId: number) {
    try {
      // Find the user by ID
      const userToDelete = await this.userRepository.findOneById(userId);

      if (!userToDelete) {
        throw new Error('User not found');
      }
      // Delete the user
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




  // deleteUser(id: number) {
  //   return this.userRepository.delete({ id });
  // }




