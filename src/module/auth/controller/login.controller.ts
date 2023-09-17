import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { LoginService } from '../service/login.service';



@Controller('auth')
export class LoginController {
  constructor(private olginService: LoginService) { }

  @Post('/login')
  async createUser(@Body() loginDto: LoginDto) {
    try {
      const newUser = await this.olginService.login(loginDto);
      return newUser;
    } catch (error) {
      throw new HttpException(
        'User not found',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

}
