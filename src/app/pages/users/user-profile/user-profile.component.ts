import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { IUser } from '../../../interfaces/iuser.interfaces';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  userService = inject(UsersService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  imageUrl: string | ArrayBuffer | null = null;
  fileName: string | null = null;

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

  
  //Cambiar foto
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.imageUrl = e.target?.result || null;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  async deleteUser(): Promise<void> {
    if (!this.unUser) {
      return;
    }
   Swal.fire({
    title: "¿Estás seguro?",
    text: "Perderás tu cuenta definitivamente",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#004a59",
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancelar",
    confirmButtonText: "¡SÍ, Quiero hacerlo!"
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await this.userService.deleteUser(this.unUser!.id);
        Swal.fire({
          title: "Eliminado",
          text: "Tu usuario ha sido eliminado correctamente",
          icon: "success",
          timer: 3000, 
          timerProgressBar: true
        }).then(() => {
          this.userService.logout();
          this.router.navigate(['/landing']);
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "No se pudo eliminar tu usuario",
          icon: "error"
        });
      }
    }
  });
  }
  
}
