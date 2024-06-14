import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MyAccountComponent } from '../../../pages/users/user-profile/my-account/my-account.component';
import { UsersService } from '../../../services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, MyAccountComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  userService = inject(UsersService);
  private router = inject(Router);

  
  //Ocultar burger automaticamente
 /*collapseNavbar() {
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
  }*/

  
  //CERRAR SESION ???
   logout(): void {
     this.userService.logout();
      Swal.fire({
      title: "Cerraste sesión",
      text: "Has cerrado sesión correctamente",
      icon: "success"
    }).then(() => {
      this.router.navigate(['/welcome']);
    });
  }

}
