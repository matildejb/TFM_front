export interface IUser {
  profileImageUrl: any;
  id: number;
  name: string;
  username: string;
  phone: number;
  email: string;
  password: string; 
  profileImage?: string; //Propiedad opcional
  token?: string;
}
