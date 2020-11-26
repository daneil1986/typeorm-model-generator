import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Round } from './Round';
import { User } from './User';
import { Word } from './Word';

@Index('learn_progress_user_id', ['userId'], {})
@Index('learn_progress_word_id', ['wordId'], {})
@Index('learn_progress_round_id', ['roundId'], {})
@Entity('learn_progress', { schema: 'preschool_literacy' })
export class LearnProgress {
  @Column('int', {
    primary: true,
    name: 'id',
    unsigned: true,
    default: () => '1',
  })
  id: number;

  @Column('int', { name: 'user_id', unsigned: true })
  userId: number;

  @Column('int', { name: 'word_id', unsigned: true })
  wordId: number;

  @Column('int', { name: 'round_id', unsigned: true })
  roundId: number;

  @Column('tinyint', { name: 'status', unsigned: true })
  status: number;

  @Column('timestamp', {
    name: 'crate_time',
    default: () => '0000-00-00 00:00:00.000000',
  })
  crateTime: Date;

  @Column('timestamp', {
    name: 'update_time',
    default: () => '0000-00-00 00:00:00.000000',
  })
  updateTime: Date;

  @Column('tinyint', { name: 'enable', unsigned: true })
  enable: number;

  @ManyToOne(() => Round, (round) => round.learnProgresses, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'round_id', referencedColumnName: 'id' }])
  round: Round;

  @ManyToOne(() => User, (user) => user.learnProgresses, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @ManyToOne(() => Word, (word) => word.learnProgresses, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'word_id', referencedColumnName: 'id' }])
  word: Word;
}
