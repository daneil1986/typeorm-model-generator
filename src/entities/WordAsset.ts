import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Word } from './Word';
import { WordAssetType } from './WordAssetType';

@Index('fk_word_asset', ['assetType'], {})
@Entity('word_asset', { schema: 'preschool_literacy' })
export class WordAsset {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('varchar', { name: 'source', length: 200 })
  source: string;

  @Column('int', { name: 'asset_type', unsigned: true })
  assetType: number;

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

  @OneToMany(() => Word, (word) => word.wordAsset)
  words: Word[];

  @ManyToOne(() => WordAssetType, (wordAssetType) => wordAssetType.wordAssets, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'asset_type', referencedColumnName: 'id' }])
  assetType2: WordAssetType;
}
