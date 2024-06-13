import { Component, inject } from '@angular/core';
import { UsersService } from '../../../../services/users.service';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../../../../interfaces/iuser.interfaces';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css'
})
export class MyAccountComponent {

  userService = inject(UsersService);
  activatedRoute = inject(ActivatedRoute);

  unUser: IUser | null = null;


    ngOnInit(): void {
      this.getUserProfile();
  }

  getUserProfile(): void {
    this.userService.getProfile().subscribe(
      (data: IUser) => {
        this.unUser = data;
      },
      (error) => {
        console.log('Error fetching user profile', error)
      }
    );
  }

}
