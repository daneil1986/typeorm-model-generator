import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { WordAsset } from './WordAsset';

@Entity('word_asset_type', { schema: 'preschool_literacy' })
export class WordAssetType {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('varchar', { name: 'label', length: 10 })
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

  @OneToMany(() => WordAsset, (wordAsset) => wordAsset.assetType2)
  wordAssets: WordAsset[];
}
