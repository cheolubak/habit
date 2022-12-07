import { ApiProperty } from '@nestjs/swagger';
import { User } from '~/user/entities/user.entity';
import * as process from 'process';

export class UserDto {
  @ApiProperty({
    type: 'string',
    description: '유저 닉네임',
    required: true,
  })
  nickname: string;

  @ApiProperty({
    type: 'string',
    description: '유저 이메일',
    required: false,
  })
  email?: string;

  @ApiProperty({
    type: 'string',
    description: '유저 프로필',
    required: true,
  })
  profile: string;

  @ApiProperty({
    type: 'string',
    description: '유저 생성일',
    required: true,
  })
  createdAt: Date;

  constructor(user: User) {
    this.nickname = user.nickname;
    this.email = user.email;
    this.profile = user.profile;
    this.createdAt = user.createdAt;
  }
}
