import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IUser } from '../../../../interfaces/iuser.interfaces';
import { UsersService } from '../../../../services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-setting',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile-setting.component.html',
  styleUrl: './profile-setting.component.css'
})
export class ProfileSettingComponent {
  user: IUser | null = null;
  private userService = inject(UsersService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  
  
  //GUARDAR CAMBIOS EN EL FORM LLEVA AL PERFIL-INFO
  //CANCELAR LLEVA AL PERFIL-INFO
  
  //ELIMINAR CUENTA USUARIO DEFINITIVAMENTE, TE LLEVA AL WELCOME
  
  deleteUser(id: string) {

    Swal.fire({
      title: "¿Estás seguro?",
      text: "Perderás tu usuario definitivamente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
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
