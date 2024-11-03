import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Metric {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  value: number;

  @Column({ type: Date })
  timestamp: Date;
}
