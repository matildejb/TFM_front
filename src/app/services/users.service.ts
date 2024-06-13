import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import { IUser } from '../interfaces/iuser.interfaces';
import { environment } from '../../environments/environment.development';

type RegisterBody = {
  name: string;
  username: string;
  phone: number;
  email: string;
  password: string;
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
  private baseUrl: string = `${environment.apiUrl}/users`;
   private profileUrl = `${this.baseUrl}/profile`;

  private httpClient = inject(HttpClient);

  register(newUser: RegisterBody): Promise<IUser & string[]> {
    return lastValueFrom(
      this.httpClient.post<IUser & string[]>(
        `${this.baseUrl}/register`,
        newUser
      )
    );
  }
  login(body: LoginBody): Promise<LoginResponse> {
    return lastValueFrom(
      this.httpClient.post<LoginResponse>(`${this.baseUrl}/login`, body)
    );
  }

  logout(): void {
    localStorage.removeItem('token');
  }
 
  getProfile(): Promise<IUser> {
    return  lastValueFrom(this.httpClient.get<IUser>(this.profileUrl));
  }

  //Actualizar profile usuario??
  updateProfile(updatedUser: IUser): Observable<IUser> {
    return this.httpClient.put<IUser>(this.profileUrl, updatedUser);
  }

  //SUBIR IMAGEN USUARIO???
  uploadUserImage(userId: number, image: File) {
    const formData = new FormData();
    formData.append('image', image);

    return this.httpClient.post(`${this.baseUrl}/${userId}/upload-image`, formData);
  }

  //elimnar usuario
   deleteUser(userId: number): Promise<IUser> {
     return lastValueFrom(this.httpClient.delete<IUser>(`${this.profileUrl}/delete/${userId}`));
  }

}
