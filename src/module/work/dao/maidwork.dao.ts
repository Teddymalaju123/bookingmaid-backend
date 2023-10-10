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
            WHERE user.type_id = '3' `;
            const results = await this.maidworkRepository.query(query);
            if (!results || results.length === 0) {
                throw new NotFoundException('Failed');
            }
            return results;
        } catch (error) {
            throw new Error(`Failed : ${error.message}`);
        }
    }

    




}
