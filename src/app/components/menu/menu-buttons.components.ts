import { Component, Input, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { GroupService } from "../../services/groups.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-menu-buttons',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu-buttons.component.html',
  styleUrl: './menu-buttons.component.css'
})
export class MenuButtonsComponent {
  @Input() parent: string = "";
  @Input() id: string = "";
  groupId: number | null = null;

  groupsService = inject(GroupService);

  // async deleteGroup(id: string) {
  //   //llamar al servicio para borrar el grupo
  //   if (id !== undefined) {
  //     let confirmacion = confirm("¿Estás seguro de que quieres eliminar el grupo?" + this.id);
  //     if (confirmacion) {
  //       //borrar
  //       let response = await this.groupsService.deleteGroup(Number(id));
  //       if (response.id) {
  //         alert(`Grupo borrado correctamente`)
  //       }
  //     }
  //   }
  // }


  async deleteGroup(id: string) {
    if (id !== undefined) {
      const result = await Swal.fire({
        title: '¿Estás seguro de que quieres eliminar el grupo ?', //+ this.id + '?',
        text: 'Esta acción no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#027184 ',
        cancelButtonColor: '#f6a278',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      });

      if (result.isConfirmed) {
        try {
          const response = await this.groupsService.deleteGroup(Number(id));
          if (response.id) {
            Swal.fire(
              'Eliminado!',
              'El grupo ha sido eliminado.',
              'success'
            );
          }
        } catch (error) {
          Swal.fire(
            'Error!',
            'Hubo un problema al eliminar el grupo.',
            'error'
          );
        }
      }
    }
  }
}