import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Round } from './Round';
import { User } from './User';
import { Word } from './Word';

@Index('learn_record_user_id', ['userId'], {})
@Index('learn_record_word_id', ['wordId'], {})
@Index('learn_record_round_id', ['roundId'], {})
@Entity('learn_activity', { schema: 'preschool_literacy' })
export class LearnActivity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('int', { name: 'user_id', unsigned: true })
  userId: number;

  @Column('int', { name: 'word_id', unsigned: true })
  wordId: number;

  @Column('int', { name: 'round_id', unsigned: true })
  roundId: number;

  @Column('float', { name: 'score', unsigned: true, precision: 4, scale: 2 })
  score: number;

  @Column('varchar', { name: 'result', length: 10 })
  result: string;

  @Column('timestamp', { name: 'crate_time', nullable: true })
  crateTime: Date | null;

  @Column('timestamp', { name: 'update_time', nullable: true })
  updateTime: Date | null;

  @Column('tinyint', {
    name: 'enable',
    nullable: true,
    unsigned: true,
    default: () => '1',
  })
  enable: number | null;

  @ManyToOne(() => Round, (round) => round.learnActivities, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'round_id', referencedColumnName: 'id' }])
  round: Round;

  @ManyToOne(() => User, (user) => user.learnActivities, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @ManyToOne(() => Word, (word) => word.learnActivities, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'word_id', referencedColumnName: 'id' }])
  word: Word;
}
