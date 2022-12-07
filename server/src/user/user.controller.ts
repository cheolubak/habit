import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from './current-user.decorator';
import {
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserDto } from '~/user/dtos/user.dto';
import { AuthGuard } from '~/common/guards/auth.guard';
import { User } from '~/user/entities/user.entity';
import { UserUpdateDto } from '~/user/dtos/user-update.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('info')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: '사용자 정보 가져오기' })
  @ApiOkResponse({
    description: '성공',
    type: UserDto,
  })
  @ApiForbiddenResponse({ description: '인증 오류' })
  @ApiInternalServerErrorResponse({ description: '서버 오류' })
  getUserInfo(@CurrentUser() user: User): UserDto {
    return new UserDto(user);
  }

  @Put('info')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: '사용자 정보 수정' })
  @ApiOkResponse({
    description: '성공',
    type: UserDto,
  })
  @ApiForbiddenResponse({ description: '인증 오류' })
  @ApiInternalServerErrorResponse({ description: '서버 오류' })
  updateUserInfo(
    @CurrentUser() user: User,
    @Body() body: UserUpdateDto,
  ): Promise<UserDto> {
    return this.userService.updateUserInfo(user, body);
  }
}
