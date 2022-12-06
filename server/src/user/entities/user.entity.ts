import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('increment', {
    type: 'int',
    name: 'id',
    comment: '사용자 id',
  })
  readonly userId: number;

  @Column('varchar', {
    length: 30,
    name: 'email',
    nullable: true,
    unique: true,
    comment: '사용자 이메일(facebook, kakao 등에서 이메일이 없을수도 있음)',
  })
  email?: string;

  @Column('varchar', {
    length: 20,
    name: 'nickname',
    nullable: false,
    unique: true,
    comment: '사용자 닉네임',
  })
  nickname: string;

  @Column('varchar', {
    length: 32,
    name: 'uid',
    nullable: false,
    unique: true,
    comment: '사용자 firebase uid',
  })
  readonly uid: string;

  @Column('varchar', {
    length: 100,
    name: 'profile',
    nullable: false,
    comment: '사용자 프로필 이미지',
  })
  profile: string;

  @CreateDateColumn({
    type: 'datetime',
    name: 'created_at',
    comment: '사용자 생성일',
  })
  readonly createdAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    name: 'updated_at',
    comment: '사용자 정보 수정일',
  })
  readonly updatedAt: Date;

  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }
}
