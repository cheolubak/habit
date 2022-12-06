import { Habit } from '~/habit/entities/habit.entity';
import * as dayjs from 'dayjs';
import { HabitStatus } from '~/habit/habit-status.enum';

describe('HabitEntity', () => {
  it('HabitEntity 생성(endAt 없이)', () => {
    const habit = new Habit({
      title: 'TEST Habit',
      description: 'TEST Habit Description',
    });

    expect(habit.title).toEqual('TEST Habit');
    expect(habit.description).toEqual('TEST Habit Description');
    expect(habit.completeCount).toEqual(0);
    expect(habit.notCompleteCount).toEqual(0);
    expect(habit.isDelete).toEqual(false);
    expect(habit.isEnd).toEqual(false);
    setTimeout(() => {
      expect(dayjs(habit.startAt).isBefore(new Date())).toBeTruthy();
      expect(dayjs(habit.startAt).isAfter(new Date())).toBeFalsy();
    });
    expect(habit.endAt).toBe(null);
  });

  it('HabitEntity 생성(endAt 같이)', () => {
    const endAt = dayjs().add(1, 'month').endOf('day');
    const habit = new Habit({
      title: 'TEST Habit',
      description: 'TEST Habit Description',
      endAt: endAt.toDate(),
    });
    expect(habit.title).toEqual('TEST Habit');
    expect(habit.description).toEqual('TEST Habit Description');
    expect(habit.completeCount).toEqual(0);
    expect(habit.notCompleteCount).toEqual(0);
    expect(habit.isDelete).toEqual(false);
    expect(habit.isEnd).toEqual(false);
    setTimeout(() => {
      expect(dayjs(habit.startAt).isBefore(new Date())).toBeTruthy();
      expect(dayjs(habit.startAt).isAfter(new Date())).toBeFalsy();
    });
    expect(dayjs(habit.endAt).format('YYYY-MM-DD HH:mm:ss')).toEqual(
      endAt.format('YYYY-MM-DD HH:mm:ss'),
    );
  });

  describe('HabitEntity 메소드', () => {
    let habit: Habit;
    beforeEach(() => {
      habit = new Habit({
        title: 'TEST Habit',
        description: 'TEST Habit Description',
      });
    });

    it('HabitEntity complete()', () => {
      const history = habit.complete();
      expect(habit.completeCount).toBe(1);
      expect(habit.notCompleteCount).toBe(0);
      expect(habit.isDelete).toBe(false);
      expect(habit.isEnd).toBe(false);
      expect(history).toEqual({ habit, status: HabitStatus.COMPLETE });
    });

    it('HabitEntity notComplete()', () => {
      const history = habit.notComplete();
      expect(habit.completeCount).toBe(0);
      expect(habit.notCompleteCount).toBe(1);
      expect(habit.isDelete).toBe(false);
      expect(habit.isEnd).toBe(false);
      expect(history).toEqual({ habit, status: HabitStatus.NOT_COMPLETE });
    });

    it('HabitEntity delete()', () => {
      const history = habit.delete();
      expect(habit.completeCount).toBe(0);
      expect(habit.notCompleteCount).toBe(0);
      expect(habit.isDelete).toBe(true);
      expect(habit.isEnd).toBe(false);
      expect(history).toEqual({ habit, status: HabitStatus.DELETE });
    });

    it('HabitEntity end()', () => {
      const history = habit.end();
      expect(habit.completeCount).toBe(0);
      expect(habit.notCompleteCount).toBe(0);
      expect(habit.isDelete).toBe(false);
      expect(habit.isEnd).toBe(true);
      expect(history).toEqual({ habit, status: HabitStatus.END });
    });
  });
});
