import { Body, Controller, Post } from '@nestjs/common';
import { UserRegisterDto } from './dtos/user-register.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  registerUser(@Body() body: UserRegisterDto) {
    return this.userService.registerUser(body);
  }
}
