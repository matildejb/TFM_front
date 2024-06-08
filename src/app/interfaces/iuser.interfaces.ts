export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  birthDate?: string; //Propiedad opcional
  phone?: string;  //Propiedad opcional
  imageUrl?: string; //Propiedad opcional
}
