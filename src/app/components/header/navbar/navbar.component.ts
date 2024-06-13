import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { RouterLink } from '@angular/router';
import { MyAccountComponent } from '../../../pages/users/user-profile/my-account/my-account.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, MyAccountComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  authService = inject(AuthService);

  //Si estas autenticado se mostrará el navbar(burger)

  
  
  //Ocultar burger automaticamente
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
