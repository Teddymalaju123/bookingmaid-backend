
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
  birthday: number;
  address: string;
  maid_rating: number;
  id_type: number;
}