import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserType } from './UserType';

@Entity({ name: 'user' })
export class User {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id_user: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  fname: string;

  @Column()
  lname: string;

  @Column()
  phone: string;

  @Column()
  roomnumber: string;

  @Column()
  roomsize: string;

  @Column()
  maid_rating: number;

  @Column()
  type_id: number;
}
