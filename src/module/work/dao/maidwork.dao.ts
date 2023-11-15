import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Maidwork } from 'src/entities/maidwork';
import { Repository } from 'typeorm';


@Injectable()
export class MaidworkDao {
    constructor(
        @InjectRepository(Maidwork)
        private readonly maidworkRepository: Repository<Maidwork>,
    ) { }
    async findAllWork() {
        try {
            const query = ` SELECT * FROM maidwork 
            INNER JOIN user on maidwork.id_user = user.id_user 
            INNER JOIN worktime_type on worktime_type.id_worktimetype = maidwork.id_timeworktype
            INNER JOIN status_type on status_type.id_status = maidwork.statuswork
            WHERE user.type_id = '3';`;
            const results = await this.maidworkRepository.query(query);
            if (!results || results.length === 0) {
                throw new NotFoundException('Failed');
            }
            return results;
        } catch (error) {
            throw new Error(`Failed : ${error.message}`);
        }
    }

    async findMaidWorkById(id_user: number): Promise<ResUserDto> {
        try {
            const query = `
            SELECT maidwork.*, worktime_type.*,status_type.*,user.*
            FROM maidwork
            INNER JOIN worktime_type ON worktime_type.id_worktimetype = maidwork.id_timeworktype
            INNER JOIN status_type ON status_type.id_status = maidwork.statuswork
            INNER JOIN user ON user.id_user = maidwork.id_user
            WHERE maidwork.id_user = ? AND maidwork.id_timeworktype != 8 AND maidwork.statuswork = 5
            AND maidwork.day >= CURDATE();;
            `;

            const results = await this.maidworkRepository.query(query, [id_user]);

            if (!results || results.length === 0) {
                throw new NotFoundException('No user with this id_user found.');
            }

            return results;
        } catch (error) {
            throw new Error(`Failed to fetch user with id_user ${id_user}: ${error.message}`);
        }
    }






}
