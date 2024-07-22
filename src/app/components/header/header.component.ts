import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { MyAccountComponent } from '../../pages/users/user-profile/my-account/my-account.component';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NavbarComponent, MyAccountComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  usersService = inject(UsersService);

   // Ocultar elementos del navbar si no estas logado
  isLoggedIn: boolean = false; 

 ngOnInit(): void {
    this.usersService.isLoggedIn.subscribe(status => {
      this.isLoggedIn = status;
    });
  }
}