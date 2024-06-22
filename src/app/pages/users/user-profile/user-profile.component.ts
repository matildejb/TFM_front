import { Component, inject } from '@angular/core';
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
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  imageUrl: string = 'assets/images/default-img.png';

  unUser: IUser | null = null;


    ngOnInit(): void {
      this.getUserProfile();
        this.userService.imageUrl$.subscribe(url => {
      this.imageUrl = url || 'assets/images/default-img.png';
    });
  }

     async getUserProfile(): Promise<void> {
    try {
      this.unUser = await this.userService.getProfile();
    } catch (error) {
      console.error('Error fetching user profile', error);
    }
  }


  //Cambiar foto
   onFileSelected(event: any): void {
     this.selectedFile = event.target.files[0] as File;
     this.previewImage();
  }
  
     previewImage(): void {
    if (!this.selectedFile) {
      return;
     }
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.previewUrl = e.target.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }


  async onUpload(): Promise<void> {
  if (!this.selectedFile || !this.unUser) {
    console.error('No se ha seleccionado ningún archivo o no se ha cargado el usuario');
    return;
  }

  try {
    const response = await this.userService.uploadImage(this.unUser.id, this.selectedFile);
    console.log('Imagen subida con éxito', response);

    // Actualizar la URL de la imagen de perfil
    this.unUser.profileImage = response.profileImage;
      
      // Resetear previewUrl para mostrar la imagen actualizada
      this.previewUrl = null;
    
    Swal.fire('Éxito', 'Imagen subida con éxito', 'success');
  } catch (error) {
    console.error('Error subiendo la imagen', error);
    Swal.fire('Error', 'Error subiendo la imagen', 'error');
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
