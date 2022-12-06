import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from './current-user.decorator';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('info')
  getUserInfo(@CurrentUser() user: User) {
    return user;
  }
}
