import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Habit } from '~/habit/entities/habit.entity';
import { DataSource, Repository } from 'typeorm';
import { HabitHistory } from '~/habit/entities/habit-history.entity';
import { HabitPostDto } from '~/habit/dtos/habit-post.dto';
import { User } from '~/user/entities/user.entity';
import * as dayjs from 'dayjs';
import { Cron } from '@nestjs/schedule';
import { HabitUpdateDto } from '~/habit/dtos/habit-update.dto';
import { PaginationResponseDto } from '~/common/dtos/pagination-response.dto';
import { HabitDto } from '~/habit/dtos/habit.dto';

@Injectable()
export class HabitService {
  constructor(
    @InjectRepository(Habit)
    private readonly habitRepository: Repository<Habit>,
    @InjectRepository(HabitHistory)
    private readonly habitHistoryRepository: Repository<HabitHistory>,
    private readonly dataSource: DataSource,
  ) {}

  async getHabits(
    user: User,
    page: number,
    pageCount: number,
  ): Promise<PaginationResponseDto<HabitDto>> {
    const habits = await this.habitRepository.find({
      where: { user: { userId: user.userId } },
      take: pageCount,
      skip: page - 1,
    });
    return new PaginationResponseDto<HabitDto>(
      habits.length >= pageCount,
      habits.map((x) => new HabitDto(x)),
    );
  }

  async getHabit(user: User, habitId: number): Promise<HabitDto> {
    const habit = await this.habitRepository.findOne({
      where: { user: { userId: user.userId }, habitId },
    });
    return new HabitDto(habit);
  }

  async postHabit(user: User, body: HabitPostDto): Promise<HabitDto> {
    const habit = await this.habitRepository.save(
      new Habit({
        title: body.title,
        user,
        description: body.description,
        startAt: body.startDate,
        endAt: body.endDate,
      }),
    );
    return new HabitDto(habit);
  }

  async updateHabit(
    user: User,
    habitId: number,
    body: HabitUpdateDto,
  ): Promise<HabitDto> {
    try {
      await this.dataSource.manager.transaction(
        async (transactionalEntityManager) => {
          const habit = await transactionalEntityManager.findOne<Habit>(Habit, {
            where: { user: { userId: user.userId }, habitId },
          });
          if (!habit) {
            throw new NotFoundException('해당 습관을 찾지 못 했습니다');
          }
          habit.change(body);
          await transactionalEntityManager.save<Habit>(habit, {
            reload: false,
          });
          return new HabitDto(habit);
        },
      );
      return;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(err.message);
    }
  }

  async completedHabit(user: User, habitId: number): Promise<void> {
    try {
      await this.dataSource.manager.transaction(
        async (transactionalEntityManager) => {
          const habit = await transactionalEntityManager.findOne<Habit>(Habit, {
            where: { user: { userId: user.userId }, habitId },
          });
          if (!habit) {
            throw new NotFoundException('해당 습관을 찾지 못 했습니다');
          }
          const history = habit.complete();
          await transactionalEntityManager.save<HabitHistory>(history, {
            reload: false,
          });
          await transactionalEntityManager.save<Habit>(habit, {
            reload: false,
          });
        },
      );
      return;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(err.message);
    }
  }

  async deleteHabit(user: User, habitId: number): Promise<void> {
    try {
      await this.dataSource.manager.transaction(
        async (transactionalEntityManager) => {
          const habit = await transactionalEntityManager.findOne<Habit>(Habit, {
            where: { user: { userId: user.userId }, habitId },
          });
          if (!habit) {
            throw new NotFoundException('해당 습관을 찾지 못 했습니다');
          }
          const history = habit.delete();
          await transactionalEntityManager.save<HabitHistory>(history, {
            reload: false,
          });
          await transactionalEntityManager.save<Habit>(habit, {
            reload: false,
          });
        },
      );
      return;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(err.message);
    }
  }

  @Cron('0 0 0 * * *')
  async notCompleteHabit(): Promise<void> {
    console.log('notCompleteHabit', dayjs().format('YYYY-MM-DD HH:mm:ss'));
    try {
      const currentAt = dayjs();
      const startAt = currentAt.subtract(1, 'hours').startOf('day').toDate();
      const endAt = currentAt.subtract(1, 'hours').endOf('day').toDate();

      return await this.dataSource.manager.transaction(
        async (transactionalEntityManager) => {
          const habits = await transactionalEntityManager
            .createQueryBuilder(Habit, 'habit')
            .where(
              `habit.id NOT IN (
                  SELECT habit_id FROM habit_history WHERE created_at BETWEEN :startAt AND :endAt
                ) 
                AND is_delete = false 
                AND is_end = false`,
              { startAt, endAt },
            )
            .getMany();
          const histories = habits.map((x) => x.notComplete());
          await transactionalEntityManager.save<Habit>(habits, {
            reload: false,
          });
          await transactionalEntityManager.save<HabitHistory>(histories, {
            reload: false,
          });
          return;
        },
      );
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(err.message);
    }
  }
}
