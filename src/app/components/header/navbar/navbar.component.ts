import { Component, inject } from '@angular/core';
import { NavigationEnd, NavigationError, Router, RouterLink } from '@angular/router';
import { MyAccountComponent } from '../../../pages/users/user-profile/my-account/my-account.component';
import { UsersService } from '../../../services/users.service';
import Swal from 'sweetalert2';
import { NgClass } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, MyAccountComponent, NgClass],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  userService = inject(UsersService);
  private router = inject(Router);

  activeLink: string = 'groupsList'; // Variable para almacenar el enlace activo


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
