import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User';
import { Repository } from 'typeorm';


@Injectable()
export class UserDao {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async findUsersWithUserTypes(): Promise<ResUserDto[]> { // Update the return type
        try {
            const query = ` SELECT * FROM user INNER JOIN usertype ON user.type_id = usertype.id_type`;
            const results = await this.userRepository.query(query);
            if (!results || results.length === 0) {
                throw new NotFoundException('No users with user types found.');
            }
            return results;
        } catch (error) {
            throw new Error(`Failed to fetch users with user types: ${error.message}`);
        }
    }
}
