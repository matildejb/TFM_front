import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
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
  private baseUrl: string = `${environment.apiUrl}/users`;

  private httpClient = inject(HttpClient);

  register(newUser: RegisterBody) {
    return lastValueFrom(
      this.httpClient.post<IUser>(`${this.baseUrl}/register`, newUser)
    );
  }
  login(body: LoginBody) {
    return lastValueFrom(
      this.httpClient.post<LoginResponse>(`${this.baseUrl}/login`, body)
    );
  }
}
