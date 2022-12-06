import { Habit } from '~/habit/entities/habit.entity';
import { ApiProperty } from '@nestjs/swagger';

export class HabitDto {
  @ApiProperty({ type: 'number', description: '습관 ID', required: true })
  habitId: number;
  @ApiProperty({ type: 'string', description: '습관 제목', required: true })
  title: string;
  @ApiProperty({
    type: 'string',
    description: '습관 설명',
    required: true,
  })
  description: string;
  @ApiProperty({
    type: 'number',
    description: '습관 완료 횟수',
    required: true,
    default: 0,
  })
  completeCount: number;
  @ApiProperty({
    type: 'number',
    description: '습관 미완료 횟수',
    required: true,
    default: 0,
  })
  notCompleteCount: number;
  @ApiProperty({
    type: 'boolean',
    description: '습관 종료 여부',
    required: false,
    default: false,
  })
  @ApiProperty()
  isEnd?: boolean;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    description: '습관 시작 일시',
    required: false,
  })
  startAt: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    description: '습관 종류 일시',
    required: false,
  })
  endAt: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    description: '습관 생성 일시',
    required: true,
  })
  createdAt: Date;

  constructor(habit: Habit) {
    this.habitId = habit.habitId;
    this.title = habit.title;
    this.completeCount = habit.completeCount;
    this.notCompleteCount = habit.notCompleteCount;
    this.isEnd = habit.isEnd;
    this.startAt = habit.startAt;
    this.endAt = habit.endAt;
    this.createdAt = habit.createdAt;
  }
}
