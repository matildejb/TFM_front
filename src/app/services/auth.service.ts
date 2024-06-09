import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    constructor(private router: Router) {} 

 //Cerrar sesión usuario   , hace falta avisar al backend?
  logout() {
     // Eliminar el token de autenticación del almacenamiento local
    localStorage.removeItem('authToken');
    // Redirigir al usuario a la página de inicio de sesión
    this.router.navigate(['/welcome']);
  }
  
}
