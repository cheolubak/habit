import { DecodedIdToken, getAuth } from 'firebase-admin/auth';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { User } from '~/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as nanoid from 'nanoid';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  private async checkUserToken(token: string): Promise<DecodedIdToken> {
    return await getAuth().verifyIdToken(token);
  }

  private async registerUser(token: string) {
    try {
      const decodedToken = await this.checkUserToken(token);
      return this.userRepository.save(
        new User({
          nickname: `HABIT_#${nanoid.customAlphabet(
            '0123456789abcdefghijklmnopqrstuvwxyz',
            6,
          )()}`,
          uid: decodedToken.uid,
          profile: decodedToken.picture ?? '/empty-profile.png',
          email: decodedToken.email,
        }),
      );
    } catch (err) {
      this.logger.error('registerUser', err);
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
    }
  }

  async validator(token?: string) {
    try {
      if (!!token) {
        const decodedToken = await this.checkUserToken(token);
        const user = this.userRepository.findOne({
          where: { uid: decodedToken.uid },
        });
        if (!user) {
          return await this.registerUser(token);
        } else {
          return user;
        }
      } else {
        return null;
      }
    } catch (err) {
      this.logger.error(err);
      const code = err.code;
      if (code === 'auth/argument-error') {
        throw new BadRequestException('인증 정보가 잘못되었어요.');
      } else if (code === 'auth/id-token-expired') {
        throw new BadRequestException('인증 정보가 만료되었어요.');
      } else {
        throw new InternalServerErrorException(err.message);
      }
    }
  }
}
