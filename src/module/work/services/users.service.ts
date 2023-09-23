
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
    const resUsers: ResUserDto[] = await this.userDao.findResidentById(id_user);

    if (!resUsers || resUsers.length === 0) {
      return null; 
    }

    const user: User = {
      id_user: resUsers[0].id_user,
      username: resUsers[0].username,
      password: resUsers[0].password,
      fname: resUsers[0].fname,
      lname: resUsers[0].lname,
      phone: resUsers[0].phone,
      roomnumber: resUsers[0].roomnumber,
      roomsize: resUsers[0].roomsize,
      maid_rating: resUsers[0].maid_rating,
      age: resUsers[0].age,
      address: resUsers[0].address,
      type_id: resUsers[0].type_id
    };

    return user;
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








