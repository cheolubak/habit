import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '~/common/guards/auth.guard';
import { CurrentUser } from '~/user/current-user.decorator';
import { User } from '~/user/entities/user.entity';
import { HabitService } from '~/habit/habit.service';
import { HabitPostDto } from '~/habit/dtos/habit-post.dto';
import { ParseNumberPipe } from '~/common/pipe/parse-number.pipe';

@Controller('habits')
export class HabitController {
  constructor(private readonly habitService: HabitService) {}

  @Post()
  @UseGuards(AuthGuard)
  postHabit(@CurrentUser() user: User, @Body() body: HabitPostDto) {
    return this.habitService.postHabit(user, body);
  }

  // @Put('not-complete')
  // notCompleteHabit() {
  //   return this.habitService.notCompleteHabit();
  // }

  @Put(':id')
  @UseGuards(AuthGuard)
  completeHabit(
    @CurrentUser() user: User,
    @Param('id', ParseNumberPipe) habitId: number,
  ) {
    return this.habitService.completedHabit(user, habitId);
  }
}
