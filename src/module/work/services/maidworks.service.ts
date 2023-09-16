
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDao } from '../dao/user.dao';
import { Maidwork } from 'src/entities/maidwork';


@Injectable()
export class MaidWorkService {
  constructor(
    private readonly userDao: UserDao,
    @InjectRepository(Maidwork) private maidWorkRepository: Repository<Maidwork>,
  ) { }

  findUsers() {
    return this.maidWorkRepository.find();
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

  async deleteMaid(maidId: number) {
    try {
      // Find the user by ID
      const maidToDelete = await this.maidWorkRepository.findOneById(maidId);

      if (!maidToDelete) {
        throw new Error('ไม่พบตารางการทำงาน');
      }
      // Delete the user
      await this.maidWorkRepository.remove(maidToDelete);
      return `ตารางการทำงาน ${maidId} ได้ลบแล้ว.`;
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




  // deleteUser(id: number) {
  //   return this.userRepository.delete({ id });
  // }




