import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import { IUser } from '../interfaces/iuser.interfaces';
import { environment } from '../../environments/environment.development';


@Injectable({
  providedIn: 'root',
})
export class UsersService {

  private httpClient = inject(HttpClient);
  private baseUrl: string = `${environment.apiUrl}/users`;
  private profileUrl = `${this.baseUrl}/profile`;
  

  getProfile(): Promise<IUser> {
    return  lastValueFrom(this.httpClient.get<IUser>(this.profileUrl));
  }

  //Actualizar profile usuario????FALTA
  updateProfile(updatedUser: IUser): Observable<IUser> {
    return this.httpClient.put<IUser>(this.profileUrl, updatedUser);
  }

  //SUBIR IMAGEN USUARIO???FALTA
  uploadUserImage(userId: number, image: File) {
    const formData = new FormData();
    formData.append('image', image);

    return this.httpClient.post(`${this.baseUrl}/${userId}/upload-image`, formData);
  }

  //elimnar usuario?? FALTA
   deleteUser(userId: number): Promise<IUser> {
     return lastValueFrom(this.httpClient.delete<IUser>(`${this.profileUrl}/delete/${userId}`));
  }

}
