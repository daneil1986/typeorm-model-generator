import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CourseContent } from './CourseContent';
import { LearnActivity } from './LearnActivity';
import { LearnProgress } from './LearnProgress';
import { UserLog } from './UserLog';
import { UserSetting } from './UserSetting';
import { WordPriority } from './WordPriority';
import { WordPriorityRecord } from './WordPriorityRecord';

@Entity('user', { schema: 'preschool_literacy' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('varchar', { name: 'uid', length: 50 })
  uid: string;

  @Column('varchar', { name: 'user_name', nullable: true, length: 50 })
  userName: string | null;

  @Column('tinyint', { name: 'gender', nullable: true, unsigned: true })
  gender: number | null;

  @Column('timestamp', { name: 'birthday', nullable: true })
  birthday: Date | null;

  @Column('varchar', { name: 'openid', nullable: true, length: 20 })
  openid: string | null;

  @Column('varchar', { name: 'unionid', nullable: true, length: 20 })
  unionid: string | null;

  @Column('tinyint', { name: 'wx_is_focus', nullable: true, unsigned: true })
  wxIsFocus: number | null;

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

  @OneToMany(() => CourseContent, (courseContent) => courseContent.user)
  courseContents: CourseContent[];

  @OneToMany(() => LearnActivity, (learnActivity) => learnActivity.user)
  learnActivities: LearnActivity[];

  @OneToMany(() => LearnProgress, (learnProgress) => learnProgress.user)
  learnProgresses: LearnProgress[];

  @OneToMany(() => UserLog, (userLog) => userLog.user)
  userLogs: UserLog[];

  @OneToMany(() => UserSetting, (userSetting) => userSetting.user)
  userSettings: UserSetting[];

  @OneToMany(() => WordPriority, (wordPriority) => wordPriority.user)
  wordPriorities: WordPriority[];

  @OneToMany(
    () => WordPriorityRecord,
    (wordPriorityRecord) => wordPriorityRecord.user
  )
  wordPriorityRecords: WordPriorityRecord[];
}
