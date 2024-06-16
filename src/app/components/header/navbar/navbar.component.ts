import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MyAccountComponent } from '../../../pages/users/user-profile/my-account/my-account.component';
import Swal from 'sweetalert2';
import { NgClass } from '@angular/common';
import { UsersService } from '../../../services/users.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, MyAccountComponent, NgClass],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  usersService = inject(UsersService);
  private router = inject(Router);
  isLoggedIn = false;

  activeLink: string = ''; // Variable para almacenar el enlace activo

   // Función para establecer el enlace activo
  setActive(link: string) {
    this.activeLink = link;
  }

  collapseNavbar(): void {
  // Cerrar offcanvas (menu desplegable) si está abierto
  const offcanvasNavbar = document.getElementById('offcanvasNavbar');
  if (offcanvasNavbar && offcanvasNavbar.classList.contains('show')) {
    offcanvasNavbar.classList.remove('show');
    offcanvasNavbar.setAttribute('aria-hidden', 'true');
    offcanvasNavbar.setAttribute('aria-expanded', 'false');

    // Eliminar el backdrop si existe (bootstrap desenfoca el body)
    const offcanvasBackdrop = document.querySelector('.offcanvas-backdrop');
    if (offcanvasBackdrop) {
      offcanvasBackdrop.remove();
    }
  }

  // Restaurar el scroll en el body y eliminar el padding derecho añadido
  document.body.style.overflow = 'auto';
  document.body.style.paddingRight = `0px`;

}

   ngOnInit(): void {
    this.usersService.isLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }
  
  //CERRAR SESION 
   logout(): void {
     this.usersService.logout();
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
