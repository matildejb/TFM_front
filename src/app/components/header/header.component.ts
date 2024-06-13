import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NavbarComponent } from './navbar/navbar.component';
import { MyAccountComponent } from '../../pages/users/user-profile/my-account/my-account.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NavbarComponent, MyAccountComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  authService = inject(AuthService);



    //Mostrar boton hamburguesa si el usuario esta logeado???

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated()
  }

}
