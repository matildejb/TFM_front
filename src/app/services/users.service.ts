import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, forkJoin, lastValueFrom, map, Observable, switchMap } from 'rxjs';
import { IUser } from '../interfaces/iuser.interfaces';
import { environment } from '../../environments/environment.development';
import { IDebt } from '../interfaces/idebt';
import { IMember } from '../interfaces/imember';
import { group } from '@angular/animations';


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
      this.httpClient.get<IUser>(this.profileUrl));
  }

  //Actualizar profile usuario????FALTA
  updateProfile(formValue: IUser): Promise<IUser> {
    return lastValueFrom(
      this.httpClient.put<IUser>(`${this.profileUrl}/${formValue._id}/update`, formValue));
  }

  //SUBIR IMAGEN USUARIO???FALTA
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


// -------------------------------------------- page friends --------------------------------------------------

  private membersUrl = `${environment.apiUrl}/members`;
 
  getMembersByGroupId(groupId:string): Observable<any>{
    const url = `${this.membersUrl}/${groupId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.httpClient.get<any>(url, {headers});
  }

   
    getUserGroups(userId: string): Promise<any> {
    const url = `${environment.apiUrl}/groups/${userId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return lastValueFrom(this.httpClient.get<any>(url, { headers }));
  }



  async getMembersOfSharedGroups(userId: string): Promise<any[]> {
    const groups = await this.getUserGroups(userId);
    const members = await Promise.all(groups.map(async (group: any) => lastValueFrom(this.getMembersByGroupId(group.id))));
   const uniqueMembers = members.flat().filter((member, index, self) =>
    index === self.findIndex((m) => m.id === member.id)
  );
  return uniqueMembers;
}


getUserPayments(userId: string): Promise<any> {
  const url = `${environment.apiUrl}/payments/user/${userId}/participated`;
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });
  return lastValueFrom(this.httpClient.get<any>(url, { headers }));
}


getMemberIds(userId: string): Promise<number[]> {
  const url = `${environment.apiUrl}/members/${userId}/known`;
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });
  return lastValueFrom(
    this.httpClient.get<any[]>(url, { headers }).pipe(
      map(members => members.map(member => member.id))
    )
  );
  }

// -------------------------------------------- page statistics--------------------------------------------------

getGroupDetails(groupId: string): Promise<any> {
  const url = `${environment.apiUrl}/groups/${groupId}`;
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });
  return lastValueFrom(this.httpClient.get<any>(url, { headers }));
}

getMemberById(memberId: string): Promise<IMember> {
  const url = `${environment.apiUrl}/members/${memberId}/known`;
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });
  return lastValueFrom(this.httpClient.get<IMember>(url, { headers }));
}

  // // apiUrl: 'http://localhost:3000/api',
}