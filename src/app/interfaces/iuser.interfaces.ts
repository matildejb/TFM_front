export interface IUser {
  id: number;
  name: string;
  username: string;
  phone?: number;//Propiedad opcional
  email: string;
  password: string; 
  imageUrl?: string; //Propiedad opcional
}
