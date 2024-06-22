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
  imageUrl: string | undefined;

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


  //Cambiar image
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
     if (response.profileImage) {
      this.unUser.profileImage = response.profileImage;
      this.imageUrl = this.unUser.profileImage; // Actualiza la imagen en la vista
    }
    
    Swal.fire('Éxito', 'Imagen subida con éxito', 'success');
  } catch (error) {
    console.error('Error subiendo la imagen', error);
    Swal.fire('Error', 'Error subiendo la imagen', 'error');
  }
}

// Borrar cuenta usuario 
  async deleteUser(): Promise<void> {
    if (!this.unUser) {
      return;
    }
   Swal.fire({
    title: "¿Estás seguro?",
    text: "Esta acción es irreversible. Perderás tu cuenta definitivamente.",
     icon: "warning",
     iconColor: '#FF0000',
    showCancelButton: true,
    confirmButtonColor: "#027184",
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
