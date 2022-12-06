import { Body, Controller, Post } from '@nestjs/common';
import { UserRegisterDto } from '../user/dtos/user-register.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('sign-up')
  registerUser(@Body() body: UserRegisterDto) {
    return this.authService.registerUser(body);
  }
}
