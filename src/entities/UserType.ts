import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'usertype' })
export class UserType {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id_type: number;

  @Column()
  type_name: string;

  @Column()
  type_description: string;

}
