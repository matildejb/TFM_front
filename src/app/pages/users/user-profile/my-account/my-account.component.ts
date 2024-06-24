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
  image: File | null = null; 
  imgURL = 'assets/images/default-img.png';
  unUser: IUser | null = null;
  
  
    ngOnInit(): void {
    this.getUserProfile();
  }

  // Datos personales por usuario
     async getUserProfile(): Promise<void> {
    try {
      this.unUser = await this.userService.getProfile();
       if (this.unUser?.profileImage) {
        this.imgURL = this.unUser.profileImage; // Mostrar imagen del perfil si existe
      }
    } catch (error) {
      console.error('Error fetching user profile', error);
    }
  }


}
