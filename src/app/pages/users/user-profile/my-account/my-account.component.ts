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

    async getUserProfile(): Promise<void> {
    try {
      this.unUser = await this.userService.getProfile();
    } catch (error) {
      console.error('Error fetching user profile', error);
    }
  }

}
