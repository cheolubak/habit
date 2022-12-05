import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('habit')
export class Habit {
  @PrimaryGeneratedColumn('increment', { type: 'int', name: 'habit_id' })
  readonly habitId: number;

  @Column('varchar', {
    length: 20,
    name: 'title',
    nullable: false,
    comment: '습관 제목',
  })
  title: string;

  @Column('varchar', {
    length: 100,
    name: 'description',
    nullable: false,
    comment: '습관 상세 내용',
  })
  description: string;

  @Column('smallint', {
    name: 'complete_count',
    unsigned: true,
    nullable: false,
    comment: '습관 완성 횟수',
  })
  completeCount: number;

  @Column('smallint', {
    name: 'not_complete_count',
    unsigned: true,
    nullable: false,
    comment: '습관 완성 못한 횟수',
  })
  notCompleteCount: number;

  @Column('boolean', {
    name: 'is_end',
    default: false,
    nullable: false,
    comment: '습관 종료 여부',
  })
  isEnd: boolean;

  @Column('datetime', {
    name: 'started_at',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    comment: '습관 시작 일시',
  })
  startedAt: Date;

  @CreateDateColumn({
    type: 'datetime',
    name: 'created_at',
    nullable: false,
    comment: '습관 생성 일자',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    name: 'updated_at',
    nullable: false,
    comment: '습관 수정 일자',
  })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.userId, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
