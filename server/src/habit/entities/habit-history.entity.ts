import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Habit } from './habit.entity';
import { HabitStatus } from '../habit-status.enum';

@Entity('habit_history')
export class HabitHistory {
  @PrimaryGeneratedColumn('increment', {
    type: 'int',
    name: 'history_id',
    unsigned: true,
    comment: '습관 히스토리 ID',
  })
  historyId: number;

  @PrimaryColumn('int', {
    name: 'habit_id',
    unsigned: true,
    comment: '습관 ID',
  })
  habitId: number;

  @Column({
    type: 'enum',
    enum: HabitStatus,
    name: 'status',
    nullable: false,
    comment: '습관 완료 상태',
  })
  status: HabitStatus;

  @CreateDateColumn({
    type: 'datetime',
    nullable: false,
    name: 'created_at',
    comment: '습관 히스토리 등록일시',
  })
  createdAt: Date;

  @ManyToOne(() => Habit, (habit) => habit.habitId)
  @JoinColumn({ name: 'habit_id' })
  habit: Habit;

  constructor(partial?: Partial<HabitHistory>) {
    Object.assign(this, partial);
  }
}
