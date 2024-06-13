import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
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

}
