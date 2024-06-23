import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { IUser } from '../interfaces/iuser.interfaces';
import { environment } from '../../environments/environment.development';
import axios from 'axios';

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

  private imageUrlSubject = new BehaviorSubject<string>('assets/images/default-img.png');

  // autenticacion usuario
  // REGISTAR - INICIO SESION - CERRAR SESIÓN POR USUARIO, 

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
  
  
  // funcionalidades de los usuarios  
  // DATOS POR USUARIO/ACTUALIZAR IMG/ ELIMINAR USUARIO

  getProfile(): Promise<IUser> {
      return lastValueFrom(
      this.httpClient.get<IUser>(this.profileUrl)
    ).then(profile => {
      const userId = profile.id;
      let imageUrl: string | null = this.getImageUrlFromLocalStorage(userId);

      if (!imageUrl) {
        imageUrl = 'assets/images/default-img.png';
      }

      this.updateImageUrl(userId, imageUrl); // Guarda la URL de la imagen asociada al usuario

      return profile;
    });
  }


  async uploadImage(id: number, file: File): Promise<any> {
    const formData = new FormData();
    formData.append('profile_image', file);
       
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No se encontró un token de autorización en el almacenamiento local.');
      }

      const response = await axios.put(`${this.profileUrl}/image/${id}`, formData, {
        headers: {
          'Authorization': token || `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
     
      if (response.data.profileImage) {
        const newImageUrl = `http://localhost:3000/uploads/${response.data.profileImage}`;
        this.updateImageUrl(id, newImageUrl);  // Actualizar el Subject con la nueva URL de la imagen
      } else {
        console.error('La respuesta del servidor no contiene profileImage');
        this.updateImageUrl(id, 'assets/images/default-img.png');
      }

      return response.data;
    } catch (error) {
      console.error('Error subiendo la imagen:', error);
      throw error;
    }
  }
   
  get imageUrl$(): Observable<string> {
    return this.imageUrlSubject.asObservable();
  }

 updateImageUrl(userId: number, imageUrl: string): void {
    this.imageUrlSubject.next(imageUrl);
    localStorage.setItem(`imageUrl_${userId}`, imageUrl); // Almacenar la URL de la imagen en el localStorage
  }


  private getImageUrlFromLocalStorage(userId: number): string | null {
    return localStorage.getItem(`profileImageUrl_${userId}`);
  }

 
private getCurrentUserId(): number | null {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    try {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      return tokenPayload.user_id || null;
    } catch (error) {
      console.error('Error al decodificar el token JWT:', error);
      return null;
    }
  }


  deleteUser(id: number): Promise<IUser> {
     return lastValueFrom(
       this.httpClient.delete<IUser>(`${this.profileUrl}/delete/${id}`)
     );
  }

   private clearImageUrl(userId: number): void {
    localStorage.removeItem(`imageUrl_${userId}`);
  }
}
