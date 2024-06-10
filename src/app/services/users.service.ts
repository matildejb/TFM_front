import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { IUser } from '../interfaces/iuser.interfaces';

type RegisterBody = {
  name: string;
  email: string;
  password: string;
  role: string;
};

type LoginBody = {
  email: string;
  password: string;
};

type LoginResponse = {
  error?: string;
  message?: string;
  token?: string;
};

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl = 'http://localhost:3000/api/users';

  private httpClient = inject(HttpClient);

  register(newUser: RegisterBody) {
    return lastValueFrom(
      this.httpClient.post<IUser & string[]>(
        `${this.baseUrl}/register`,
        newUser
      )
    );
  }
  login(body: LoginBody) {
    return lastValueFrom(
      this.httpClient.post<LoginResponse>(`${this.baseUrl}/login`, body)
    );
  }


  //Obtener usuario por Id
  getUserById(id: number): Promise<IUser> {
    return lastValueFrom(
      this.httpClient.get<IUser>(`${this.baseUrl}/${id}`)
    );
  }

  //Actualizar usuario por id 
   updateById(formValue: IUser): Promise<IUser> {
    return lastValueFrom(
      this.httpClient.put<IUser>(
        `${this.baseUrl}/${formValue.id}`,
        formValue
      )
    );
  }

  //SUBIR IMAGEN USUARIO???
  uploadUserImage(userId: number, image: File) {
    const formData = new FormData();
    formData.append('image', image);

    return this.httpClient.post(`${this.baseUrl}/${userId}/upload-image`, formData);
  }

  //Eliminar cuenta usuario
   deleteUser(id: number): Promise<IUser> {
    return lastValueFrom(
      this.httpClient.delete<IUser>(`${this.baseUrl}/${id}`)
    );
  }

}
