import { Module } from '@nestjs/common';
import { HabitController } from './habit.controller';
import { HabitService } from './habit.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Habit } from './entities/habit.entity';

@Module({
  controllers: [HabitController],
  providers: [HabitService],
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Habit]),
  ],
})
export class HabitModule {}
