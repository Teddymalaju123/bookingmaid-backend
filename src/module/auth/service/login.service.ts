
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User';
import { Repository } from 'typeorm';


@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }

  findUsers() {
    return this.userRepository.find();
  }


  async login(loginReq: LoginDto): Promise<User | null> {
    const query = `
      SELECT * FROM user
      INNER JOIN usertype ON user.type_id = usertype.id_type
      WHERE username = ? and password = ? 
    `;
    const [user] = await this.userRepository.query(query, [loginReq.username, loginReq.password]);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

}







