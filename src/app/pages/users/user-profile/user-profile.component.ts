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
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  imageUrl: string | undefined;

  unUser: IUser | null = null;


    ngOnInit(): void {
      this.getUserProfile();
      this.loadProfileImage();
  }

     async getUserProfile(): Promise<void> {
    try {
      this.unUser = await this.userService.getProfile();
    } catch (error) {
      console.error('Error fetching user profile', error);
    }
  }

  async loadProfileImage() {
      try {
    // Obtener datos del perfil del usuario
    this.unUser = await this.userService.getProfile();

    // Verificar si el usuario tiene una imagen de perfil
    if (this.unUser && this.unUser.profileImage) {
      // Construir la URL completa de la imagen
      this.imageUrl = `{{environment.apiUrl}}/uploads/${this.unUser.profileImage}`;
    } else {
      // Si el usuario no tiene imagen de perfil, mostrar una imagen por defecto
      this.imageUrl = 'assets/images/default-img.png';
      this.previewUrl = this.imageUrl;
    }
  } catch (error) {
    console.error('Error al cargar la imagen de perfil', error);
  }
    }


  //Cambiar foto
   onFileSelected(event: any): void {
     this.selectedFile = event.target.files[0] as File;
     console.log('Archivo seleccionado:', this.selectedFile);
     this.previewImage();
  }
  
     previewImage(): void {
    if (!this.selectedFile) {
      return;
     }
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.previewUrl = e.target.result;
        console.log('Vista previa de la imagen:', this.previewUrl);
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

    // Construir la nueva URL completa de la imagen
    this.previewUrl = `{{environment.apiUrl}}/uploads/${this.unUser.profileImage}`;

    Swal.fire('Éxito', 'Imagen subida con éxito', 'success');
  } catch (error) {
    console.error('Error subiendo la imagen', error);
    Swal.fire('Error', 'Error subiendo la imagen', 'error');
  }
}

    

   async  subirArchivo(): Promise<void> {

     try {
       await this.onUpload();
      
    } catch (error) {
          console.error('Error al subir archivo', error);
    }
    
  }

//  

//  resizeImage(file: File, maxSize: number): Promise<File> {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = (event: any) => {
//         const img = new Image();
//         img.onload = () => {
//           const canvas = document.createElement('canvas');
//           let width = img.width;
//           let height = img.height;

//           if (width > maxSize || height > maxSize) {
//             if (width > height) {
//               height *= maxSize / width;
//               width = maxSize;
//             } else {
//               width *= maxSize / height;
//               height = maxSize;
//             }
//           }

//           canvas.width = width;
//           canvas.height = height;

//           const ctx = canvas.getContext('2d');
//           if (ctx) {
//             ctx.drawImage(img, 0, 0, width, height);
//             canvas.toBlob((blob) => {
//               const resizedFile = new File([blob!], file.name, {
//                 type: file.type,
//                 lastModified: Date.now()
//               });
//               resolve(resizedFile);
//             }, file.type);
//           } else {
//             reject(new Error('Failed to create canvas context.'));
//           }
//         };
//         img.src = event.target.result;
//       };
//       reader.readAsDataURL(file);
//     });
 

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
