import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserUpdateDto {
  @ApiProperty({
    type: 'string',
    description: '유저 프로필 이미지 URL or BASE64',
    required: true,
  })
  profile?: string;

  @ApiProperty({
    type: 'string',
    description: '유저 닉네임',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  nickname: string;
}
