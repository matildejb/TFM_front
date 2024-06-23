import { Component, Input, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { GroupService } from "../../services/groups.service";

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

  async deleteGroup(id: string) {
    //llamar al servicio para borrar el grupo
    if (id !== undefined) {
      let confirmacion = confirm("¿Estás seguro de que quieres eliminar el grupo?" + this.id);
      if (confirmacion) {
        //borrar
        let response = await this.groupsService.deleteGroup(Number(id));
        if (response.id) {
          alert(`Grupo borrado correctamente`)
        }
      }
    }
  }
}
