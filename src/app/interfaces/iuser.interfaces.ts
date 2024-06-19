export interface IUser {
  _id: string
  id: number;
  name: string;
  username: string;
  phone: number;
  email: string;
  password: string; 
  imageUrl?: string; //Propiedad opcional
  token?: string;
}
