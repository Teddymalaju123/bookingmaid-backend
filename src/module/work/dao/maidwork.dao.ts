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

    async findMaidWorkById(id_user: number): Promise<ResUserDto> {
        try {
            const query = `
          SELECT maidwork.*, worktime_type.*
FROM maidwork
INNER JOIN worktime_type ON worktime_type.id_worktimetype = maidwork.id_timeworktype
WHERE maidwork.id_user = ?;
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
