import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRegisterDto } from './dtos/user-register.dto';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject('AuthService') private readonly authService: AuthService,
  ) {}

  async registerUser(body: UserRegisterDto) {
    return this.authService
      .checkUserToken(body.token)
      .then((user) => {
        return this.userRepository.save(
          new User(
            body.nickname,
            user.uid,
            body.profile ?? user.picture ?? '/empty-profile.png',
            user.email,
          ),
        );
      })
      .then((user) => console.log(user))
      .catch((err) => {
        console.error(err);
        const code = err.code;
        if (code === 'ER_DUP_ENTRY') {
          throw new ConflictException(err.message);
        } else if (code === 'auth/argument-error') {
          throw new BadRequestException(err.message);
        } else {
          throw new InternalServerErrorException(err.message);
        }
      });
  }
}
