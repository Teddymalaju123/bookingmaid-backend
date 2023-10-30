import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'status_type' })
export class Working_type {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id_status: number;

  @Column()
  status_name : string;

  @Column()
  description_work : string;
}
