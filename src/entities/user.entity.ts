import { Entity, Column, PrimaryGeneratedColumn, Timestamp, CreateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ comment: '主键id' })
  id: number;

  @Column({ length: 100, comment: 'uid', unique: true })
  uid: string;

  @Column({ comment: '手机号', unique: true })
  phone: string;

  @Column({ length: 500, comment: '昵称', charset: 'utf8mb4', collation: 'utf8mb4_general_ci' })
  name: string;

  @Column({ type: 'enum', enum: [0, 1], comment: '性别， 0是女孩， 1是男孩' })
  gender: number;

  @Column({ length: 8, comment: '出生年月' })
  birthday: string;

  @Column({ length: 100, comment: 'openid', unique: true })
  openid: string;

  @Column({ length: 100, comment: 'unionid', unique: true })
  unionid: string;

  @Column({ length: 500, comment: '微信昵称', charset: 'utf8mb4', collation: 'utf8mb4_general_ci' })
  wechat: string;

  @Column({ type: 'enum', enum: [0, 1], comment: '是否关注公众号， 0没有关注， 1是关注', nullable: false, default: 0 })
  isFollow: number;

  @Column({ type: 'timestamp', default: () => 'current_timestamp' })
  createAt: Timestamp;

  @Column({ type: 'timestamp', onUpdate: 'current_timestamp', default: () => 'current_timestamp' })
  updateAt: Timestamp;
}
