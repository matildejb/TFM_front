import { Component, inject } from '@angular/core';
import { UsersService } from '../../../../services/users.service';
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
  unUser: IUser | null = null;
  imageUrl: string = 'assets/images/default-img.png';


      ngOnInit(): void {
       this.userService.imageUrl$.subscribe(
      imageUrl => {
        if (imageUrl) {
          this.imageUrl = imageUrl;
        }
      }
    );
    this.getUserProfile();
  }

    async getUserProfile(): Promise<void> {
    try {
      this.unUser = await this.userService.getProfile();
      if (this.unUser?.profileImage) {
        this.imageUrl = this.unUser.profileImage;
      }
    } catch (error) {
      console.error('Error fetching user profile', error);
    }
  }

}
