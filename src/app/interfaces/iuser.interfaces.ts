export interface IUser {
  name: string;
  birthDate?: string;
  phone?: string;  //Propiedad opcional
  email: string;
  password: string;
  imageUrl?: string; //Propiedad opcional
}
