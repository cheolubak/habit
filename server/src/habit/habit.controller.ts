import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '~/common/guards/auth.guard';
import { CurrentUser } from '~/user/current-user.decorator';
import { User } from '~/user/entities/user.entity';
import { HabitService } from '~/habit/habit.service';
import { HabitPostDto } from '~/habit/dtos/habit-post.dto';
import { ParseNumberPipe } from '~/common/pipe/parse-number.pipe';
import { HabitUpdateDto } from '~/habit/dtos/habit-update.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PagePipe } from '~/common/pipe/page.pipe';
import { PageCountPipe } from '~/common/pipe/page-count.pipe';
import { PaginationResponseDto } from '~/common/dtos/pagination-response.dto';
import { HabitDto } from '~/habit/dtos/habit.dto';

@ApiTags('habits')
@Controller('habits')
export class HabitController {
  constructor(private readonly habitService: HabitService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: '습관 목록 가져오기' })
  @ApiOkResponse({
    description: '성공',
    isArray: true,
    type: HabitDto,
  })
  @ApiForbiddenResponse({ description: '인증 오류' })
  @ApiInternalServerErrorResponse({ description: '서버 오류' })
  getHabits(
    @CurrentUser() user: User,
    @Query('page', PagePipe) page: number,
    @Query('count', PageCountPipe) pageCount: number,
  ): Promise<PaginationResponseDto<HabitDto>> {
    return this.habitService.getHabits(user, page, pageCount);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: '습관 가져오기' })
  @ApiOkResponse({ description: '성공' })
  @ApiForbiddenResponse({ description: '인증 오류' })
  @ApiNotFoundResponse({ description: '존재하지 않는 습관' })
  @ApiInternalServerErrorResponse({ description: '서버 오류' })
  getHabit(
    @CurrentUser() user: User,
    @Param('id', ParseNumberPipe) habitId: number,
  ): Promise<HabitDto> {
    return this.habitService.getHabit(user, habitId);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: '습관 만들기' })
  @ApiCreatedResponse({ description: '성공' })
  @ApiBadRequestResponse({ description: '잘못된 요청' })
  @ApiForbiddenResponse({ description: '인증 오류' })
  @ApiInternalServerErrorResponse({ description: '서버 오류' })
  postHabit(
    @CurrentUser() user: User,
    @Body() body: HabitPostDto,
  ): Promise<HabitDto> {
    return this.habitService.postHabit(user, body);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: '습관 수정' })
  @ApiOkResponse({ description: '성공' })
  @ApiBadRequestResponse({ description: '잘못된 요청' })
  @ApiForbiddenResponse({ description: '인증 오류' })
  @ApiNotFoundResponse({ description: '존재하지 않는 습관' })
  @ApiInternalServerErrorResponse({ description: '서버 오류' })
  updateHabit(
    @CurrentUser() user: User,
    @Param('id', ParseNumberPipe) habitId: number,
    @Body() body: HabitUpdateDto,
  ) {
    return this.habitService.updateHabit(user, habitId, body);
  }

  @Put('complete/:id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: '습관 완료 처리' })
  @ApiOkResponse({ description: '성공' })
  @ApiForbiddenResponse({ description: '인증 오류' })
  @ApiNotFoundResponse({ description: '존재하지 않는 습관' })
  @ApiInternalServerErrorResponse({ description: '서버 오류' })
  completeHabit(
    @CurrentUser() user: User,
    @Param('id', ParseNumberPipe) habitId: number,
  ) {
    return this.habitService.completedHabit(user, habitId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: '습관 삭제' })
  @ApiOkResponse({ description: '성공' })
  @ApiForbiddenResponse({ description: '인증 오류' })
  @ApiNotFoundResponse({ description: '존재하지 않는 습관' })
  @ApiInternalServerErrorResponse({ description: '서버 오류' })
  deleteHabit(
    @CurrentUser() user: User,
    @Param('id', ParseNumberPipe) habitId: number,
  ) {
    return this.habitService.deleteHabit(user, habitId);
  }
}
