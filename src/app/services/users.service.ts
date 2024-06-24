import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, forkJoin, lastValueFrom, map, Observable, switchMap } from 'rxjs';
import { IUser } from '../interfaces/iuser.interfaces';
import { environment } from '../../environments/environment.development';
import { IDebt } from '../interfaces/idebt';
import { IMember } from '../interfaces/imember';
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
  //permite actualizar la UI inmediatamente cuando el usuario cierra o inicia sesión
  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token'); // Verifica si el token está presente en el localStorage
  }
  
  
  // funcionalidades de los usuarios  
  // DATOS POR USUARIO/ACTUALIZAR IMG/ ELIMINAR USUARIO

  getProfile(): Promise<IUser> {
      return lastValueFrom(
      this.httpClient.get<IUser>(this.profileUrl)
    )
  }


    getUserById(id: number): Promise<IUser> {
    return lastValueFrom(this.httpClient.get<IUser>(`${this.baseUrl}/${id}`));
  }

  // Actualizar perfil de usuario
  updateProfile(userData: IUser): Promise<IUser> {
    return lastValueFrom(
      this.httpClient.put<IUser>(`${this.baseUrl}/updateUser/${userData.id}`,
        userData
      )
    );
  }
  

  //IMG

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
        const newImageUrl = response.data.profileImage;
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


  async getUserImage(userId: number): Promise<any> {
     try {
    const response = await axios.get(`/api/users/${userId}/image`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios specific errors
      console.error(`Error getting user image: ${error.message}`, {
        code: error.code,
        response: error.response ? {
          status: error.response.status,
          data: error.response.data,
        } : null,
      });
    } else {
      // Handle other errors
      console.error(`Unexpected error: ${error}`);
    }
    throw error; 
  }
  }

  deleteUser(id: number): Promise<IUser> {
    return lastValueFrom(
      this.httpClient.delete<IUser>(`${this.profileUrl}/delete/${id}`)
    );
  }


// -------------------------------------------- page historial --------------------------------------------------

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


getMemberIds(userId: string): Promise<any[]> {
  const url = `${environment.apiUrl}/members/${userId}/known`;
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });
  return lastValueFrom(
    this.httpClient.get<any[]>(url, { headers }).pipe(
      map(members => {
        console.log('Members received:', members); // Log the entire response first
        return members.map(member => ({
          id: member.id,
          name: member.name,
          email: member.email,
          imageUrl: member.imageUrl
        }));
      })
    )
  );
}



// -------------------------------------------- page amigos--------------------------------------------------



getLoggedInUserProfile(): Promise<IUser> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });
  console.log('Requesting user profile...');
  return lastValueFrom(this.httpClient.get<IUser>(this.profileUrl, { headers })).then(profile => {
    console.log('User profile received:', profile);
    return profile;
  }).catch(error => {
    console.error('Error fetching user profile:', error);
    throw error;
  });
}

async getMembersOfSharedGroupsForLoggedInUser(): Promise<any[]> {
  try {
    // Obtenemos el perfil del usuario logueado
    const userProfile = await this.getLoggedInUserProfile();
    const userId: string = userProfile.id.toString();
    // Obtenemos los grupos del usuario
    const groups = await this.getUserGroups(userId);
    
    // Obtenemos los miembros de los grupos (sin repetir)
    const members = await Promise.all(groups.map(async (group: any) => lastValueFrom(this.getMembersByGroupId(group.id))));
    
    // Filtramos y devolvemos los miembros únicos
    const uniqueMembers = members.flat().filter((member, index, self) =>
      index === self.findIndex((m) => m.id === member.id)
    );
    
    return uniqueMembers;
  } catch (error) {
    console.error('Error fetching friends list:', error);
    throw error;
  }
}

private miembros = 'http://localhost:3000/api/members/11/known';
getKnownMembers(): Observable<any[]> {
  return this.httpClient.get<any[]>(this.miembros);
}


  // // apiUrl: 'http://localhost:3000/api',
}