import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserActionType } from './UserActionType';
import { User } from './User';

@Index('action_type', ['actionType'], {})
@Index('fk_user_log', ['userId'], {})
@Entity('user_log', { schema: 'preschool_literacy' })
export class UserLog {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('int', { name: 'user_id', unsigned: true })
  userId: number;

  @Column('tinyint', { name: 'action_type', unsigned: true })
  actionType: number;

  @Column('varchar', { name: 'device', length: 100 })
  device: string;

  @Column('varchar', { name: 'platform', nullable: true, length: 10 })
  platform: string | null;

  @Column('varchar', { name: 'sys_version', nullable: true, length: 20 })
  sysVersion: string | null;

  @Column('varchar', { name: 'app_version', nullable: true, length: 10 })
  appVersion: string | null;

  @Column('timestamp', { name: 'create_time', nullable: true })
  createTime: Date | null;

  @Column('timestamp', { name: 'update_time', nullable: true })
  updateTime: Date | null;

  @Column('tinyint', {
    name: 'enable',
    nullable: true,
    unsigned: true,
    default: () => '1',
  })
  enable: number | null;

  @ManyToOne(
    () => UserActionType,
    (userActionType) => userActionType.userLogs,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
  )
  @JoinColumn([{ name: 'action_type', referencedColumnName: 'id' }])
  actionType2: UserActionType;

  @ManyToOne(() => User, (user) => user.userLogs, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;
}
