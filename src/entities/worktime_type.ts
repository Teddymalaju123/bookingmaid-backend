import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'worktime_type' })
export class Working_type {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id_worktimetype: number;

  
  @Column({ type: 'time'})
  start_work : Date;

  @Column({ type: 'time'})
  end_work : Date;
  
  @Column()
  description_work : string;

}
