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

    async findUsersWithUserTypes(): Promise<ResUserDto[]> { 
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

    async findMaid(): Promise<ResUserDto[]> {
        try {
          const query = `
            SELECT *
            FROM user
            INNER JOIN usertype ON user.type_id = usertype.id_type
            WHERE usertype.id_type = '3';
          `;
          const results = await this.userRepository.query(query);
      
          if (!results || results.length === 0) {
            throw new NotFoundException('No maids found.');
          }
      
          return results;
        } catch (error) {
          throw new Error(`Failed to fetch maids: ${error.message}`);
        }
      }
      
    async findResident(): Promise<ResUserDto[]> { // Update the return type
        try {
            const query = ` SELECT * FROM user INNER JOIN usertype ON user.type_id = usertype.id_type WHERE usertype.id_type = '2' `;
            const results = await this.userRepository.query(query);
            if (!results || results.length === 0) {
                throw new NotFoundException('No users with user types found.');
            }
            return results;
        } catch (error) {
            throw new Error(`Failed to fetch users with user types: ${error.message}`);
        }
    }

    async findResidentById(id_user: number): Promise<ResUserDto[]> {
        try {
          const query = `
            SELECT * 
            FROM user 
            INNER JOIN usertype ON user.type_id = usertype.id_type 
            WHERE user.id_user = ?;`; // Use a prepared statement with '?'
      
          const results = await this.userRepository.query(query, [id_user]); // Pass [id_user] as an array
      
          if (!results || results.length === 0) {
            throw new NotFoundException('No user with this id_user found.');
          }
      
          return results;
        } catch (error) {
          throw new Error(`Failed to fetch user with id_user ${id_user}: ${error.message}`);
        }
      }



}
