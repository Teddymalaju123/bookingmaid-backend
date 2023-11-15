
interface CreateUserDto {
  id_user: number;
  username: string;
  password: string;
  profile: Buffer;
  fname: string;
  lname: string;
  nickname: string;
  phone: string;
  roomnumber: string;
  roomsize: string;
  id_card: number;
  birthday: Date;
  address: string;
  maid_sumrating: number;
  id_type: number;
}