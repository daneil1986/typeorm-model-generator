import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Word } from './Word';

@Index('fk_word_map', ['wordId'], {})
@Entity('word_map', { schema: 'preschool_literacy' })
export class WordMap {
  @Column('int', { primary: true, name: 'id', unsigned: true })
  id: number;

  @Column('int', { name: 'order', unsigned: true })
  order: number;

  @Column('int', { name: 'word_id', unsigned: true })
  wordId: number;

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

  @ManyToOne(() => Word, (word) => word.wordMaps, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'word_id', referencedColumnName: 'id' }])
  word: Word;
}
