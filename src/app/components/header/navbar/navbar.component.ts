import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MyAccountComponent } from '../../../pages/users/user-profile/my-account/my-account.component';
import Swal from 'sweetalert2';
import { NgClass } from '@angular/common';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, MyAccountComponent, NgClass],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  authService = inject(AuthService);
  private router = inject(Router);
  isLoggedIn = false;

  activeLink: string = ''; // Variable para almacenar el enlace activo

   // Función para establecer el enlace activo
  setActive(link: string) {
    this.activeLink = link;
  }

  collapseNavbar(): void {
   // Cerrar menú desplegable de Bootstrap si está abierto
   const navbarNav = document.getElementById('navbarNav');
    if (navbarNav && navbarNav.classList.contains('show')) {
      navbarNav.classList.remove('show');
    }
     // Cerrar offcanvas si está abierto
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

   ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }
  
  //CERRAR SESION 
   logout(): void {
     this.authService.logout();
      Swal.fire({
      title: "Cerraste sesión",
      icon: "success",
      timer: 1500, 
      showConfirmButton: false
    }).then(() => {
      this.router.navigate(['/welcome']);
    });
  }

}
