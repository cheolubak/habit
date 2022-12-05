import { DecodedIdToken, getAuth } from 'firebase-admin/auth';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserRegisterDto } from '../user/dtos/user-register.dto';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  private async checkUserToken(token: string): Promise<DecodedIdToken> {
    return await getAuth().verifyIdToken(token);
  }

  async registerUser(body: UserRegisterDto) {
    return this.checkUserToken(body.token)
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
      .then((user) => user)
      .catch((err) => {
        console.error('registerUser', err);
        const code = err.code;
        if (code === 'ER_DUP_ENTRY') {
          throw new ConflictException(err.message);
        } else if (code === 'auth/argument-error') {
          throw new BadRequestException('인증 정보가 잘못되었어요.');
        } else if (code === 'auth/id-token-expired') {
          throw new BadRequestException('인증 정보가 만료되었어요.');
        } else {
          throw new InternalServerErrorException(err.message);
        }
      });
  }

  validator(token: string) {
    return this.checkUserToken(token)
      .then((user) => {
        return this.userRepository.findOne({ where: { uid: user.uid } });
      })
      .catch((err) => {
        console.error('validator', err);
        const code = err.code;
        if (code === 'auth/argument-error') {
          throw new BadRequestException('인증 정보가 잘못되었어요.');
        } else if (code === 'auth/id-token-expired') {
          throw new BadRequestException('인증 정보가 만료되었어요.');
        } else {
          throw new InternalServerErrorException(err.message);
        }
      });
  }
}
