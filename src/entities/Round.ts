import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CourseContent } from './CourseContent';
import { LearnActivity } from './LearnActivity';
import { LearnProgress } from './LearnProgress';

@Entity('round', { schema: 'preschool_literacy' })
export class Round {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('varchar', { name: 'label', length: 20 })
  label: string;

  @Column('tinyint', { name: 'value', unsigned: true })
  value: number;

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

  @OneToMany(() => CourseContent, (courseContent) => courseContent.round)
  courseContents: CourseContent[];

  @OneToMany(() => LearnActivity, (learnActivity) => learnActivity.round)
  learnActivities: LearnActivity[];

  @OneToMany(() => LearnProgress, (learnProgress) => learnProgress.round)
  learnProgresses: LearnProgress[];
}
