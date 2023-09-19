
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { UserDao } from '../dao/user.dao';
import { Maidwork } from 'src/entities/maidwork';


@Injectable()
export class MaidWorkService {
  constructor(
    private readonly userDao: UserDao,
    @InjectRepository(Maidwork) private maidWorkRepository: Repository<Maidwork>,
  ) { }

  async findWork(id_user: number) {
    try {
      const findOptions: FindManyOptions = {
        where: {
          id_user: id_user,
        },
      };
      const workData = await this.maidWorkRepository.find(findOptions);
      if (!workData || workData.length === 0) {
        throw new NotFoundException(`ไม่พบข้อมูลการทำงานสำหรับผู้ใช้รหัส ${id_user}`);
      }
      return workData;
    } catch (error) {
      throw new Error(`เกิดข้อผิดพลาดในการค้นหาข้อมูลการทำงาน: ${error.message}`);
    }
  }

  async createMaidwork(maidDetails: CreateMaidDto) {
    try {
      const newMaid = this.maidWorkRepository.create({
        ...maidDetails,
      });
      return await this.maidWorkRepository.save(newMaid);
    } catch (error) {
      throw new Error(error);
    }
  }

  async editMaid(maidDetails: CreateMaidDto) {
    try {
      const existingMaid = await this.maidWorkRepository.findOneById(maidDetails.id_worktime);
      console.log(existingMaid);

      if (!existingMaid) {
        throw new Error('ไม่พบตารางการทำงาน');
      }
      existingMaid.workingtime = maidDetails.workingtime;
      existingMaid.endworking = maidDetails.endworking;
      existingMaid.status = maidDetails.status;
      return await this.maidWorkRepository.save(existingMaid);
    } catch (error) {
      throw new Error(error);
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