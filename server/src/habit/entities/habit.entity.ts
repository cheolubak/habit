import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '~/user/entities/user.entity';
import { HabitHistory } from '~/habit/entities/habit-history.entity';
import { HabitStatus } from '~/habit/habit-status.enum';
import { HabitUpdateDto } from '~/habit/dtos/habit-update.dto';

@Entity('habit')
export class Habit {
  @PrimaryGeneratedColumn('increment', {
    type: 'int',
    name: 'id',
    unsigned: true,
    comment: '습관 ID',
  })
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
    default: 0,
    comment: '습관 완성 횟수',
  })
  completeCount: number;

  @Column('smallint', {
    name: 'not_complete_count',
    unsigned: true,
    nullable: false,
    default: 0,
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

  @Column('boolean', {
    name: 'is_delete',
    default: false,
    nullable: false,
    comment: '습관 삭제 여부',
  })
  isDelete: boolean;

  @Column('datetime', {
    name: 'start_at',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    comment: '습관 시작 일시',
  })
  readonly startAt: Date;

  @Column('datetime', {
    name: 'end_at',
    nullable: true,
    comment: '습관 종료 일시',
  })
  endAt: Date;

  @CreateDateColumn({
    type: 'datetime',
    name: 'created_at',
    nullable: false,
    comment: '습관 생성 일자',
  })
  readonly createdAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    name: 'updated_at',
    nullable: false,
    comment: '습관 수정 일자',
  })
  readonly updatedAt: Date;

  @ManyToOne(() => User, (user) => user.userId, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  readonly user: User;

  @OneToMany(() => HabitHistory, (history) => history.habit)
  history: HabitHistory[];

  constructor(partial?: Partial<Habit>) {
    Object.assign(this, partial);
  }

  change({ title, description, endDate }: HabitUpdateDto) {
    this.title = title;
    this.description = description;
    this.endAt = endDate;
  }

  complete() {
    this.completeCount += 1;
    return new HabitHistory({
      habit: this,
      status: HabitStatus.COMPLETE,
    });
  }

  notComplete() {
    this.notCompleteCount += 1;
    return new HabitHistory({
      habit: this,
      status: HabitStatus.NOT_COMPLETE,
    });
  }

  delete() {
    this.isDelete = true;
    return new HabitHistory({
      habit: this,
      status: HabitStatus.DELETE,
    });
  }
}
