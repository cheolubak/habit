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
import { HabitStatus } from '~/habit/habit-status.enum';

@Injectable()
export class HabitService {
  constructor(
    @InjectRepository(Habit)
    private readonly habitRepository: Repository<Habit>,
    @InjectRepository(HabitHistory)
    private readonly habitHistoryRepository: Repository<HabitHistory>,
    private readonly dataSource: DataSource,
  ) {}

  postHabit(user: User, body: HabitPostDto) {
    return this.habitRepository.save(
      new Habit({
        title: body.title,
        user,
        description: body.description,
        startAt: body.startDate,
        endAt: body.endDate,
      }),
    );
  }

  async completedHabit(user: User, habitId: number) {
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

  async notCompleteHabit() {
    try {
      const currentAt = dayjs();
      const startAt = currentAt.subtract(1, 'hours').startOf('day').toDate();
      const endAt = currentAt.subtract(1, 'hours').endOf('day').toDate();

      return await this.dataSource.manager.transaction(
        async (transactionalEntityManager) => {
          const habits = await transactionalEntityManager
            .createQueryBuilder(Habit, 'habit')
            .where(
              `habit.id not in (SELECT habit_id FROM habit_history WHERE created_at between :startAt and :endAt)`,
              { startAt, endAt },
            )
            .getMany();
          const histories = habits.map((x) => {
            x.notComplete();
            return new HabitHistory({
              habit: x,
              status: HabitStatus.NOT_COMPLETE,
            });
          });
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
