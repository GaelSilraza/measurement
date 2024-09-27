import { Measurement } from '@src/modules/measurement/entities/Measurement';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'equipments' })
export class Equipment extends BaseEntity {
  @Index()
  @PrimaryColumn('varchar', {
    length: 12,
    name: 'id',
  })
  id!: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 150,
    nullable: false,
  })
  name!: string;

  @Column({
    name: 'is_active',
    type: 'boolean',
    default: false,
    nullable: false,
  })
  isActive!: boolean;

  @CreateDateColumn({
    name: 'created_at',
    nullable: false,
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    nullable: false,
  })
  updatedAt!: Date;

  @OneToMany(() => Measurement, (measurement) => measurement.equipment)
  measurements!: Measurement[];
}
