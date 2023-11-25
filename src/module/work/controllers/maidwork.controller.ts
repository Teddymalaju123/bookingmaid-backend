import { Controller, Post, Delete, Body, Param, HttpException, HttpStatus, Get, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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

  @Get("/getworkforweb/:id_user")
  getWorkByID(@Param('id_user') id_user: number) {
    return this.maidService.findWorkByID(id_user);
  }

  @Get("/getworkbyidwork/:id_worktime")
  getWorkIdWork(@Param('id_worktime') id_worktime: number) {
    return this.maidService.findWorkByIdwork(id_worktime);
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

  @Post('/update-work')
  async updateWork(
    @Body() updateWorkDto: UpdateWorkDto,
  ) {
    try {
      const updatedWorking = await this.maidService.updateWorktime(updateWorkDto);
      return updatedWorking;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Booking not found with ID: ${updateWorkDto.id_worktime}`);
      } else {
        throw new Error(`Error updating booking status: ${error.message}`);
      }
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
