import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
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
  private httpClient = inject(HttpClient);
  private baseUrl: string = `${environment.apiUrl}/users`;
  private profileUrl = `${this.baseUrl}/profile`;
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  // Autenticación de usuario
  register(newUser: RegisterBody): Promise<IUser & string[]> {
    return lastValueFrom(
      this.httpClient.post<IUser & string[]>(
        `${this.baseUrl}/register`,
        newUser
      )
    );
  }

  async login(body: LoginBody): Promise<LoginResponse> {
    const response = await lastValueFrom(
      this.httpClient.post<LoginResponse>(`${this.baseUrl}/login`, body)
    );
    if (response.token) {
      localStorage.setItem('token', response.token);
      this.loggedIn.next(true); // Notifica a los suscriptores que el usuario ha iniciado sesión
    }
    return response;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }
  // Permite actualizar la UI inmediatamente cuando el usuario cierra o inicia sesión
  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token'); // Verifica si el token está presente en el localStorage
  }

  // Funcionalidades de los usuarios
  getProfile(): Promise<IUser> {
    return lastValueFrom(this.httpClient.get<IUser>(this.profileUrl));
  }

  getUserById(id: number): Promise<IUser> {
    return lastValueFrom(this.httpClient.get<IUser>(`${this.baseUrl}/${id}`));
  }

  // Actualizar perfil de usuario
  updateProfile(userData: IUser): Promise<IUser> {
    return lastValueFrom(
      this.httpClient.put<IUser>(
        `${this.baseUrl}/updateUser/${userData.id}`,
        userData
      )
    );
  }

  // SUBIR IMAGEN USUARIO???FALTA
  uploadUserImage(userId: number, image: File) {
    const formData = new FormData();
    formData.append('image', image);

    return this.httpClient.post(
      `${this.baseUrl}/${userId}/upload-image`,
      formData
    );
  }

  deleteUser(id: number): Promise<IUser> {
    return lastValueFrom(
      this.httpClient.delete<IUser>(`${this.profileUrl}/delete/${id}`)
    );
  }
}
