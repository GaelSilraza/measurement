import { Equipment } from '@src/modules/equipment/entities/Equipment';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'measurements' })
export class Measurement extends BaseEntity {
  @Index()
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({
    name: 'value',
    type: 'float',
    nullable: false,
  })
  value!: number;

  @Index()
  @CreateDateColumn({
    name: 'timestamp',
    nullable: false,
    type: 'timestamptz',
  })
  timestamp!: Date;

  @Column({
    name: 'equipment_id',
    type: 'varchar',
    length: 150,
    nullable: false,
  })
  equipmentId!: string;

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

  @ManyToOne(() => Equipment, (equipment) => equipment.measurements)
  @JoinColumn({ name: 'equipment_id' })
  equipment!: Equipment;

  @BeforeInsert()
  parseToTwoDecimalPlaces() {
    this.value = parseFloat(Number(this.value).toFixed(2));
  }
}
