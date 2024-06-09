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

  //Mostrar boton hamburguesa si el usuario esta logeado.

  //CERRAR SESION
   onLogout() {
    this.authService.logout();
  }
}
