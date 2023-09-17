import { Controller, Post, Delete, Body, Param, HttpException, HttpStatus, Get } from '@nestjs/common';
import { UsersService } from '../services/users.service';


@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) { }

  @Get('/users-with-types')
  async findUsersWithUserTypes() {
    return this.userService.findUsersWithUserTypes();
  }


  @Get("/get")
  getUsers() {
    return this.userService.findUsers();
  }

  @Get("/get-maid")
  getMaid() {
    return this.userService.findMaid();
  }

  @Get("/get-resident")
  getResident() {
    return this.userService.findMaid();
  }


  @Post('/save')
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.userService.createUser(createUserDto);
      return newUser;
    } catch (error) {
      throw new HttpException(
        'Failed to create user. Please try again later.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/edit')
  async editUser(@Body() createUserDto: CreateUserDto) {
    try {
      const updatedUser = await this.userService.editUser(createUserDto);
      return updatedUser;
    } catch (error) {
      console.log(error);

      throw new HttpException(
        error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('/delete/:id')
  async deleteUser(@Param('id') userId: string) {
    try {
      const id = parseInt(userId, 10);
      const result = await this.userService.deleteUser(id);
      return { message: result };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


}
