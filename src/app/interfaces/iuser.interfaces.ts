export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  phone?: number;//Propiedad opcional
  email: string;
  password: string; 
  imageUrl?: string; //Propiedad opcional
}
