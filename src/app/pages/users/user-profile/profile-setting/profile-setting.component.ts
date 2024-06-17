import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IUser } from '../../../../interfaces/iuser.interfaces';
import { UsersService } from '../../../../services/users.service';
import Swal from 'sweetalert2';
import { RegisterComponent } from '../../register/register.component';

@Component({
  selector: 'app-profile-setting',
  standalone: true,
  imports: [RouterLink, RegisterComponent],
  templateUrl: './profile-setting.component.html',
  styleUrl: './profile-setting.component.css'
})
export class ProfileSettingComponent {
  userId: number = 0;
  @Input() unUser: IUser = {
    //DEBERIA IR VACIO ESTE ARRAY
    name: 'Marco',
    email: 'marco@gmail.com',
    username: 'marcopolo',
    phone: 123455,
    password: '12344',
  };

  private userService = inject(UsersService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  imageUrl: string | ArrayBuffer | null = null;
  fileName: string | null = null;

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


  //ELIMINAR CUENTA USUARIO DEFINITIVAMENTE, TE LLEVA AL WELCOME

  deleteUser(id: number) {

    Swal.fire({
      title: "¿Estás seguro?",
      text: "Perderás tu usuario definitivamente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#004a59",
      cancelButtonColor: "#d33",
      cancelButtonText: "cancelar",
      confirmButtonText: "¡SÍ, Quiero hacerlo!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Eliminado",
          text: "Tu usuario ha sido eliminado correctamente",
          icon: "success"

        });
        this.router.navigate(['/landing'])
      }
    });

  }
}
