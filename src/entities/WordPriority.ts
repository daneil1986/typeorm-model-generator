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

@Index('fk_word_priority_1', ['wordId'], {})
@Index('fk_word_priority', ['userId'], {})
@Entity('word_priority', { schema: 'preschool_literacy' })
export class WordPriority {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('int', { name: 'user_id', unsigned: true })
  userId: number;

  @Column('int', { name: 'word_id', unsigned: true })
  wordId: number;

  @Column('tinyint', { name: 'priority', nullable: true, unsigned: true })
  priority: number | null;

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

  @ManyToOne(() => User, (user) => user.wordPriorities, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @ManyToOne(() => Word, (word) => word.wordPriorities, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'word_id', referencedColumnName: 'id' }])
  word: Word;
}
