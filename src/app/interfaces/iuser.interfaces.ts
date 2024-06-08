export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone?: number;//Propiedad opcional
  password: string; 
  imageUrl?: string; //Propiedad opcional
}
