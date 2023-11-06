import { Controller, Post, Delete, Body, Param, HttpException, HttpStatus, Get, InternalServerErrorException } from '@nestjs/common';
import { MaidWorkService } from '../services/maidworks.service';


@Controller('maidwork')
export class MaidWorkController {
  [x: string]: any;
  constructor(private maidService: MaidWorkService) { }


  @Get('/getwork')
  async findAllWork() {
    return this.maidService.findAllWork()
  }

  @Get("/getwork/:id_user")
  getWork(@Param('id_user') id_user: number) {
    return this.maidService.findWork(id_user);
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

  @Post('/editmaid/:id_worktime')
  async editMaid(@Param('id_worktime') idWorktime: number, @Body() createMaidDto: CreateMaidDto) {
    try {
      const updatedMaid = await this.maidService.editMaid(idWorktime, createMaidDto);
      return updatedMaid;
    } catch (error) {
      console.log(error);

      throw new HttpException(
        error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/editmaidworktime/:id_worktime')
  async editMaidWorkTime(@Param('id_worktime') idWorktime: number, @Body() createMaidDto: CreateMaidDto) {
    try {
      const updatedMaid = await this.maidService.editMaidWorkTime(idWorktime, createMaidDto);
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
  async deleteMaid(@Param('id') id_worktime: number): Promise<string> {
    try {
      const resultMessage = await this.maidService.deleteMaid(id_worktime);
      return resultMessage;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

}
