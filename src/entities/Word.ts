import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CourseContent } from './CourseContent';
import { LearnActivity } from './LearnActivity';
import { LearnProgress } from './LearnProgress';
import { WordAsset } from './WordAsset';
import { WordMap } from './WordMap';
import { WordPriority } from './WordPriority';
import { WordPriorityRecord } from './WordPriorityRecord';

@Index('word_asset', ['wordAssetId'], {})
@Entity('word', { schema: 'preschool_literacy' })
export class Word {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('varchar', { name: 'name', length: 20 })
  name: string;

  @Column('char', { name: 'title', length: 1 })
  title: string;

  @Column('varchar', { name: 'sentence', length: 100 })
  sentence: string;

  @Column('varchar', { name: 'word', length: 20 })
  word: string;

  @Column('int', { name: 'word_asset_id', unsigned: true })
  wordAssetId: number;

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

  @OneToMany(() => CourseContent, (courseContent) => courseContent.word)
  courseContents: CourseContent[];

  @OneToMany(() => LearnActivity, (learnActivity) => learnActivity.word)
  learnActivities: LearnActivity[];

  @OneToMany(() => LearnProgress, (learnProgress) => learnProgress.word)
  learnProgresses: LearnProgress[];

  @ManyToOne(() => WordAsset, (wordAsset) => wordAsset.words, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'word_asset_id', referencedColumnName: 'id' }])
  wordAsset: WordAsset;

  @OneToMany(() => WordMap, (wordMap) => wordMap.word)
  wordMaps: WordMap[];

  @OneToMany(() => WordPriority, (wordPriority) => wordPriority.word)
  wordPriorities: WordPriority[];

  @OneToMany(
    () => WordPriorityRecord,
    (wordPriorityRecord) => wordPriorityRecord.word,
  )
  wordPriorityRecords: WordPriorityRecord[];
}
