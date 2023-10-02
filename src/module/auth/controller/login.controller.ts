import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { LoginService } from '../service/login.service';



@Controller('auth')
export class LoginController {
  constructor(private loginService: LoginService) { }

  @Post('/login')
  async createUser(@Body() loginDto: LoginDto) {
    try {
      // Log the loginDto
      console.log('Received login DTO:', loginDto);

      const newUser = await this.loginService.login(loginDto);
      return newUser;
    } catch (error) {
      throw new HttpException(
        'User not found',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

}
