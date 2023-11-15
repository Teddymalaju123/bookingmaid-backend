import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'feedback' })
export class Feedback {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  feedback_id : number;

  @Column()
  feedback_description: string;

  @Column()
  id_user : number;

  @Column()
  id_booking : number;

  @Column()
  status_feedback : number;

}
