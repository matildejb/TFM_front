import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  private imageUrlSubject = new BehaviorSubject<string | null>(null); // Subject para la URL de la imagen
  

  // autenticacion usuario

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

  getProfile(): Promise<IUser> {
    return lastValueFrom(
      this.httpClient.get<IUser>(this.profileUrl)
    ).then(profile => {
    let imageUrl: string;

    // Intenta obtener la URL de la imagen desde localStorage
    const storedImageUrl = this.getImageUrlFromLocalStorage();

    if (storedImageUrl) {
      imageUrl = storedImageUrl;
    } else {
      // Si no hay una URL almacenada, utiliza la URL por defecto
      imageUrl = 'assets/images/default-img.png';
    }

    // Actualiza el Subject con la URL de la imagen
    this.imageUrlSubject.next(imageUrl);
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
        this.updateImageUrl(newImageUrl);  // Actualizar el Subject con la nueva URL de la imagen
      } else {
        console.error('La respuesta del servidor no contiene profileImage');
        this.updateImageUrl('assets/images/default-img.png');
      }

      return response.data;
    } catch (error) {
      console.error('Error subiendo la imagen:', error);
      throw error;
    }
  }
   
  get imageUrl$(): Observable<string | null> {
    return this.imageUrlSubject.asObservable();
       
  }
    // Método para limpiar la URL de la imagen y actualizar el Subject
  clearImageUrl(): void {
    this.imageUrlSubject.next(null);
    this.clearImageUrlFromLocalStorage();
  }
  
  // Método para guardar la URL de la imagen en localStorage
  private saveImageUrlToLocalStorage(imageUrl: string): void {
    localStorage.setItem('profileImageUrl', imageUrl);
  }

  // Método para obtener la URL de la imagen desde localStorage
  private getImageUrlFromLocalStorage(): string | null {
    return localStorage.getItem('profileImageUrl');
  }

  // Método para limpiar la URL de la imagen en localStorage
  private clearImageUrlFromLocalStorage(): void {
    localStorage.removeItem('profileImageUrl');
  }

  // Actualizar el Subject con la nueva URL de la imagen y guardarla en localStorage
  private updateImageUrl(imageUrl: string): void {
    this.imageUrlSubject.next(imageUrl);
    this.saveImageUrlToLocalStorage(imageUrl);
  }


  deleteUser(id: number): Promise<IUser> {
     return lastValueFrom(
       this.httpClient.delete<IUser>(`${this.profileUrl}/delete/${id}`)
     );
  }
}
