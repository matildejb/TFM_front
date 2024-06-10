import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  userService = inject(UsersService);
  authService = inject(AuthService);

  
  //Mostrar boton hamburguesa si el usuario esta logeado???

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated()
  }

  //Mostrar burger
 collapseNavbar() {
   const navbarNav = document.getElementById('navbarNav');
    if (navbarNav && navbarNav.classList.contains('show')) {
      navbarNav.classList.remove('show');
    }
     //0cultar el burger si está abierto
    const offcanvasNavbar = document.getElementById('offcanvasNavbar');
    if (offcanvasNavbar && offcanvasNavbar.classList.contains('show')) {
      const offcanvasBackdrop = document.querySelector('.offcanvas-backdrop');
      if (offcanvasBackdrop) {
        offcanvasBackdrop.remove();
      }
      offcanvasNavbar.classList.remove('show');
   }
     // Restaurar el scroll en el body
    document.body.style.overflow = 'auto';
 }

  //CERRAR SESION ???
   onLogout() {
    this.authService.logout();
  }
}
