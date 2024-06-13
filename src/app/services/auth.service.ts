import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) { }
  private loggedIn = false;

  //Verificación del estado de autenticación
  isLoggedIn(): boolean {
    return this.loggedIn;
  }
  
  isAuthenticated(): boolean {
    // Verifica si el token de autenticación existe en el almacenamiento local
    return !!localStorage.getItem('token');
  }

 //Cerrar sesión usuario   , hace falta avisar al backend?
  logout() {
     // Eliminar el token de autenticación del almacenamiento local
    localStorage.removeItem('authToken');
    // Redirigir al usuario a la página de inicio de sesión
    this.router.navigate(['/welcome']);
  }
  
}
