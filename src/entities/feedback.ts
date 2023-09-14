import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserType } from './UserType';

@Entity({ name: 'feedback' })
export class Feedback {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  feedback_id : number;

  @Column()
  feedback_description: string;

  @Column()
  id_user : number;
}
