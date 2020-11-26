import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserLog } from './UserLog';

@Entity('user_action_type', { schema: 'preschool_literacy' })
export class UserActionType {
  @PrimaryGeneratedColumn({ type: 'tinyint', name: 'id', unsigned: true })
  id: number;

  @Column('varchar', { name: 'label', length: 20 })
  label: string;

  @Column('tinyint', { name: 'value' })
  value: number;

  @Column('timestamp', {
    name: 'create_time',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  @Column('timestamp', {
    name: 'update_time',
    default: () => '0000-00-00 00:00:00',
  })
  updateTime: Date;

  @Column('tinyint', {
    name: 'enable',
    nullable: true,
    unsigned: true,
    default: () => '1',
  })
  enable: number | null;

  @OneToMany(() => UserLog, (userLog) => userLog.actionType2)
  userLogs: UserLog[];
}
