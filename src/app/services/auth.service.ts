import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from '../interfaces/iuser.interfaces';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';

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
  providedIn: 'root'
})
export class AuthService {

  private httpClient = inject(HttpClient);
  private baseUrl: string = `${environment.apiUrl}/users`;
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

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
    ).then(response => {
      if (response.token) {
        localStorage.setItem('token', response.token);
        this.loggedIn.next(true);  // Notifica a los suscriptores que el usuario ha iniciado sesión
      }
      return response;
    });
  }

   logout(): void {
    localStorage.removeItem('token');
     this.loggedIn.next(false);  
  }
    //permite actualizar la UI inmediatamente cuando el usuario cierra o inicia sesión
    get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');  // Verifica si el token está presente en el localStorage
  }

 
}
