import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IUser } from '../../../../interfaces/iuser.interfaces';
import { UsersService } from '../../../../services/users.service';

@Component({
  selector: 'app-profile-info',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.css'
})
export class ProfileInfoComponent {

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

