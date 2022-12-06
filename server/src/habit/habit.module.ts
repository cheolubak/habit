import { Module } from '@nestjs/common';
import { HabitController } from './habit.controller';
import { HabitService } from './habit.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Habit } from './entities/habit.entity';
import { HabitHistory } from './entities/habit-history.entity';

@Module({
  controllers: [HabitController],
  providers: [HabitService],
  imports: [TypeOrmModule.forFeature([User, Habit, HabitHistory])],
})
export class HabitModule {}
