import { Controller, Post, Delete, Body, Param, HttpException, HttpStatus, Get } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { MaidWorkService } from '../services/maidworks.service';


@Controller('maidwork')
export class MaidWorkController {
  constructor(private maidService: MaidWorkService) { }

  @Get('/users-with-types')
  async findUsersWithUserTypes() {
    return this.maidService.findUsersWithUserTypes();
  }


  @Get("/getwork")
  getUsers() {
    return this.maidService.findUsers();
  }

  @Post('/savework')
  async createMaidwork(@Body() createMaidDto: CreateMaidDto) {
    try {
      const newMaid = await this.maidService.createMaidwork(createMaidDto);
      return newMaid;
    } catch (error) {
      throw new HttpException(
        'การสร้างตารางงานล้มเหลว.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/editmaid')
  async editMaid(@Body() createMaidDto: CreateMaidDto) {
    try {
      const updatedMaid = await this.maidService.editMaid(createMaidDto);
      return updatedMaid;
    } catch (error) {
      console.log(error);

      throw new HttpException(
        error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('/deletemaid/:id')
  async deleteMaid(@Param('id') maidId: string) {
    try {
      const id = parseInt(maidId, 10);
      const result = await this.maidService.deleteMaid(id);
      return { message: result };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


}
