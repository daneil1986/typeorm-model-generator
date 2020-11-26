import { Column, Entity, OneToMany } from 'typeorm';
import { AppVerison } from './AppVerison';

@Entity('platform', { schema: 'preschool_literacy' })
export class Platform {
  @Column('tinyint', { primary: true, name: 'id' })
  id: number;

  @Column('varchar', { name: 'label', nullable: true, length: 255 })
  label: string | null;

  @Column('tinyint', { name: 'value', nullable: true })
  value: number | null;

  @Column('timestamp', { name: 'create_time', nullable: true })
  createTime: Date | null;

  @Column('timestamp', { name: 'update_time', nullable: true })
  updateTime: Date | null;

  @Column('tinyint', { name: 'enable', nullable: true, width: 1 })
  enable: boolean | null;

  @OneToMany(() => AppVerison, (appVerison) => appVerison.platform)
  appVerisons: AppVerison[];
}
