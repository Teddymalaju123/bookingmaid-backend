import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserType } from './UserType';

@Entity({ name: 'maidwork' })
export class Maidwork {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id_worktime  : number;

  @Column()
  status: string;

  @Column()
  workingtime : Date;

  @Column()
  endworking: Date;

  @Column()
  id_user : number;
}
