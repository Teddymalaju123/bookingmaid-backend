
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { UserDao } from '../dao/user.dao';
import { Maidwork } from 'src/entities/maidwork';
import { MaidworkDao } from '../dao/maidwork.dao';
import { format, utcToZonedTime } from 'date-fns-tz';


@Injectable()
export class MaidWorkService {
  constructor(
    private readonly userDao: UserDao,
    private readonly maiddao: MaidworkDao,
    @InjectRepository(Maidwork) private maidWorkRepository: Repository<Maidwork>,
  ) { }

  async findAllWork() {
    try {
      const results = await this.maiddao.findAllWork();

      if (!results || results.length === 0) {
        throw new NotFoundException('Failed');
      }

      return results;
    } catch (error) {
      throw new Error(`Failed: ${error.message}`);
    }
  }

  async findWork(id_user: number): Promise<Maidwork | null> {
    const resUsers: ResUserDto = await this.maiddao.findMaidWorkById(id_user);
    return resUsers;
  }

  
  async findWorkByID(id_user: number): Promise<Maidwork | null> {
    const resUsers: ResUserDto = await this.maiddao.findMaidWorkByIdForweb(id_user);
    return resUsers;
  }

  async findWorkByIdwork(id_user: number){
    const resUsers: ResUserDto = await this.maiddao.findMaidWorkByIdWork(id_user);
    return resUsers;
  }

  async findDuplicateCreate(maidDetails: CreateMaidDto) {
    try {
      const existingWork = await this.maiddao.findDuplicateCreate(maidDetails);
  
      const updatedExistingWork = existingWork.map((item, index) => {
        const utcDate = new Date(item.day);
        const timeZone = 'Asia/Bangkok';
  
        const zonedDate = utcToZonedTime(utcDate, timeZone);
        const formattedDate = format(zonedDate, 'yyyy-MM-dd HH:mm:ssXXX', { timeZone });
  
        return { ...item, day: formattedDate };
      });
  
      return updatedExistingWork;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createMaidwork(maidDetails: CreateMaidDto) {
    try {
      const existingWork = await this.findDuplicateCreate(maidDetails);
      console.log(existingWork);
      console.log(maidDetails);
      if(existingWork.length > 0){
        throw new HttpException('ไม่สามารถสร้างงาน', 400);
      }
  
      const newMaid = this.maidWorkRepository.create({
        ...maidDetails,
      });
  
      return await this.maidWorkRepository.save(newMaid);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  

  async editMaid(idWorktime: number, maidDetails: CreateMaidDto) {
    try {
      const existingMaid = await this.maidWorkRepository.findOne({ where: { id_worktime: idWorktime } });
      console.log(existingMaid);

      if (!existingMaid) {
        throw new Error('ไม่พบตารางการทำงาน');
      }
      existingMaid.day = maidDetails.day;
      existingMaid.id_timeworktype = maidDetails.id_timeworktype;
      existingMaid.statuswork = maidDetails.statuswork;

      const updatedMaid = await this.maidWorkRepository.save(existingMaid);
      return updatedMaid;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateWorktime(updateWorkDto: UpdateWorkDto): Promise<Maidwork> {
    const working = await this.maidWorkRepository.findOneById(updateWorkDto.id_worktime);
    if (!working) {
      throw new NotFoundException('Booking not found');
    }
    working.id_timeworktype = updateWorkDto.id_timeworktype;
    const updatedWorking = await this.maidWorkRepository.save(working);
    return updatedWorking;
  }

  async editMaidWorkTime(idWorktime: number, maidDetails: CreateMaidDto) {
    try {
      const existingMaid = await this.maidWorkRepository.findOne({ where: { id_worktime: idWorktime } });
      console.log(existingMaid);

      if (!existingMaid) {
        throw new Error('ไม่พบตารางการทำงาน');
      }
      existingMaid.id_timeworktype = maidDetails.id_timeworktype;

      const updatedMaid = await this.maidWorkRepository.save(existingMaid);
      return updatedMaid;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteMaid(id_worktime: number): Promise<string> {
    try {
      const deleteResult = await this.maidWorkRepository.delete(id_worktime);

      if (deleteResult.affected === 0) {
        throw new NotFoundException('ไม่พบตารางการทำงาน');
      }

      return `ตารางการทำงาน ${id_worktime} ได้ลบแล้ว.`;
    } catch (error) {
      throw new Error(`ไม่สามารถลบตารางงาน: ${error.message}`);
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