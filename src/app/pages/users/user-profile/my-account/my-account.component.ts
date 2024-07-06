import { Component, inject } from '@angular/core';
import { UsersService } from '../../../../services/users.service';
import { IUser } from '../../../../interfaces/iuser.interfaces';
import { Subscription } from 'rxjs';

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
  private imageUrlSubscription: Subscription | undefined;
  
  
    ngOnInit(): void {
      this.getUserProfile();
        this.subscribeToImageUrlChanges();
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

   private subscribeToImageUrlChanges(): void {
    this.imageUrlSubscription = this.userService.imageUrl$.subscribe(
      (imageUrl) => {
        this.imgURL = imageUrl; // Actualiza la imagen cuando cambie en el servicio
      }
    );
  }


}
