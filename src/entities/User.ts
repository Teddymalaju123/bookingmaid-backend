
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
  nickname: string;

  @Column({ type: 'longblob' }) 
  profile: Buffer;

  @Column()
  phone: string;

  @Column()
  roomnumber: string;

  @Column()
  roomsize: string;

  @Column()
  maid_rating: number;

  @Column()
  id_card: number;

  @Column( { type: 'date' })
  birthday: Date;

  @Column()
  address: string;

  @Column()
  type_id: number;
}
