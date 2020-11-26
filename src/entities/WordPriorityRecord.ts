import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
import { Word } from './Word';

@Index('record_word_id', ['wordId'], {})
@Index('record_user_id', ['userId'], {})
@Entity('word_priority_record', { schema: 'preschool_literacy' })
export class WordPriorityRecord {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('int', { name: 'user_id', unsigned: true })
  userId: number;

  @Column('int', { name: 'word_id', unsigned: true })
  wordId: number;

  @Column('int', { name: 'action' })
  action: number;

  @Column('timestamp', {
    name: 'create_time',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  @Column('timestamp', { name: 'update_time', nullable: true })
  updateTime: Date | null;

  @ManyToOne(() => User, (user) => user.wordPriorityRecords, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @ManyToOne(() => Word, (word) => word.wordPriorityRecords, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'word_id', referencedColumnName: 'id' }])
  word: Word;
}
