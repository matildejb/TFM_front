import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { IUser } from '../../../interfaces/iuser.interfaces';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
 private userService = inject(UsersService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
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
      if (this.unUser && this.unUser.id) {
        this.imgURL = await this.userService.getUserImage(this.unUser.id);
      }
    } catch (error) {
      console.error('Error fetching user profile', error);
    }
  }

  //Elegir imagen y previsualizarla
 onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imgURL = reader.result as string;
      };
      this.image = file;
    }
  }
  
  // Subir la imagen y actualizar la URL de la imagen
  async onSubmit(): Promise<void> {
    if (!this.image || !this.unUser) {
      console.error('No se ha seleccionado ningún archivo o no se ha cargado el usuario');
      return;
    }

    try {
      const response = await this.userService.uploadImage(this.unUser.id, this.image);
      if (response.profileImage) {
        this.unUser.profileImageUrl = response.profileImage;
        this.imgURL = response.profileImage; // Actualiza la imagen en la vista
        this.userService.updateImageUrl(this.unUser.id, this.imgURL);
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
          text: "Debes finalizar tus grupos activos para eliminar tu cuenta.",
          icon: "error"
        });
      }
    }
  });
  }
  
}
