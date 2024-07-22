import { Component, Input, inject } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
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
  router = inject(Router);

  async ngOnInit() {
    if (this.parent === 'group') {
      this.groupId = Number(this.id);
    }
  }

async deleteGroup(id: string) {
  if (id !== undefined) {
    // Obtener el grupo por su ID
    let group = await this.groupsService.getGroupById(Number(id));
    

    const result = await Swal.fire({
      title: `¿Estás seguro de que quieres eliminar el grupo "${group.title}"?`,
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#027184',
      cancelButtonColor: '#f6a278',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
    // Redireccionar a la lista de grupos
          this.router.navigate(['/groupsList']);

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
          'Solo el administrador puede realizar esta acción.',
          'error'
        );
      }
    }
  }
  }
}
