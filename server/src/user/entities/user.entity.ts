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
    name: 'user_id',
    comment: '사용자 id',
  })
  readonly userId: number;

  @Column('varchar', {
    length: 30,
    name: 'user_email',
    nullable: true,
    unique: true,
    comment: '사용자 이메일(facebook, kakao 등에서 이메일이 없을수도 있음)',
  })
  readonly email?: string;

  @Column('varchar', {
    length: 20,
    name: 'user_nickname',
    nullable: false,
    unique: true,
    comment: '사용자 닉네임',
  })
  readonly nickname: string;

  @Column('varchar', {
    length: 32,
    name: 'user_uid',
    nullable: false,
    unique: true,
    comment: '사용자 firebase uid',
  })
  readonly uid: string;

  @Column('varchar', {
    length: 100,
    name: 'user_profile',
    nullable: false,
    comment: '사용자 프로필 이미지',
  })
  readonly profile: string;

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

  constructor(nickname: string, uid: string, profile: string, email?: string) {
    this.email = email;
    this.nickname = nickname;
    this.uid = uid;
    this.profile = profile;
  }
}
