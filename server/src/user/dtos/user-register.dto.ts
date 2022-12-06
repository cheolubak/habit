import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UserRegisterDto {
  @IsNotEmpty()
  @IsString()
  token: string;
  profile?: string;
  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  nickname: string;
}
