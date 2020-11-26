import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Round } from './Round';
import { User } from './User';
import { Word } from './Word';

@Index('user_id', ['userId'], {})
@Index('word_id', ['wordId'], {})
@Index('round_id', ['roundId'], {})
@Entity('course_content', { schema: 'preschool_literacy' })
export class CourseContent {
  @Column('int', { primary: true, name: 'id' })
  id: number;

  @Column('int', { name: 'user_id', unsigned: true })
  userId: number;

  @Column('int', { name: 'word_id', unsigned: true })
  wordId: number;

  @Column('int', { name: 'round_id', unsigned: true })
  roundId: number;

  @Column('varchar', { name: 'content', length: 255 })
  content: string;

  @Column('timestamp', {
    name: 'create_time',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  @Column('timestamp', { name: 'update_time', nullable: true })
  updateTime: Date | null;

  @Column('tinyint', { name: 'enable', nullable: true, width: 1 })
  enable: boolean | null;

  @ManyToOne(() => Round, (round) => round.courseContents, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'round_id', referencedColumnName: 'id' }])
  round: Round;

  @ManyToOne(() => User, (user) => user.courseContents, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @ManyToOne(() => Word, (word) => word.courseContents, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'word_id', referencedColumnName: 'id' }])
  word: Word;
}
