import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserUpdateDto } from '~/user/dtos/user-update.dto';
import { UserDto } from '~/user/dtos/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async updateUserInfo(user: User, body: UserUpdateDto): Promise<UserDto> {
    try {
      const updateData: User = {
        ...user,
        nickname: body.nickname,
        profile: body.profile,
      };
      const updatedUser = await this.userRepository.save<User>(updateData);
      return new UserDto(updatedUser);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
