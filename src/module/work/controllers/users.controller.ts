import { Controller, Post, Delete, Body, Param, HttpException, HttpStatus, Get, NotFoundException } from '@nestjs/common';
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
    return this.userService.findResident();
  }

  @Get('/get-resident/:id_user')
  async findResidentById(@Param('id_user') id_user: number) {
    const user = await this.userService.findResidentById(id_user);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
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

  @Post('/edit/:id_user')
  async editUser(@Param('id_user') idUser: number, @Body() createUserDto: CreateUserDto) {
    try {
      const updatedUser = await this.userService.editUser(idUser, createUserDto);
      return updatedUser;
    } catch (error) {
      console.log(error);
      throw new HttpException('ไม่สามารถแก้ไขข้อมูลผู้ใช้ได้', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/editRating/:id_user')
  async editRating(@Param('id_user') idUser: number, @Body() createUserDto: CreateUserDto) {
    try {
      const updatedUser = await this.userService.editRating(idUser, createUserDto);
      return updatedUser;
    } catch (error) {
      console.log(error);
      throw new HttpException('ไม่สามารถแก้ไขข้อมูลผู้ใช้ได้', HttpStatus.INTERNAL_SERVER_ERROR);
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
