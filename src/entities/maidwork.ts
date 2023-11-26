import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'maidwork' })
export class Maidwork {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id_worktime  : number;

  @Column()
  statuswork: number;

  @Column({type: 'date'})
  day : Date;

  @Column()
  id_timeworktype: number;

  @Column()
  id_user : number;
}
