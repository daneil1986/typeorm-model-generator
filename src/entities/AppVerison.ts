import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Platform } from './Platform';

@Index('fk_app_version', ['platformId'], {})
@Entity('app_version', { schema: 'preschool_literacy' })
export class AppVerison {
  @Column('int', { primary: true, name: 'id', unsigned: true })
  id: number;

  @Column('varchar', { name: 'version', length: 20 })
  version: string;

  @Column('tinyint', { name: 'status', unsigned: true })
  status: number;

  @Column('tinyint', { name: 'type', unsigned: true })
  type: number;

  @Column('varchar', { name: 'source', length: 500 })
  source: string;

  @Column('int', { name: 'device_type', nullable: true, unsigned: true })
  deviceType: number | null;

  @Column('tinyint', {
    name: 'enable',
    nullable: true,
    unsigned: true,
    default: () => '1',
  })
  enable: number | null;

  @Column('tinyint', { name: 'platform_id', nullable: true })
  platformId: number | null;

  @Column('timestamp', { name: 'update_time', nullable: true })
  updateTime: Date | null;

  @Column('timestamp', { name: 'create_time', nullable: true })
  createTime: Date | null;

  @Column('varchar', { name: 'desc', nullable: true, length: 255 })
  desc: string | null;

  @Column('varchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @ManyToOne(() => Platform, (platform) => platform.appVerisons, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'platform_id', referencedColumnName: 'id' }])
  platform: Platform;
}
