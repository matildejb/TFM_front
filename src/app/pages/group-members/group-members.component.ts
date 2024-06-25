import { Component, inject, OnInit } from '@angular/core';
import { GroupService } from '../../services/groups.service';
import { environment } from '../../../environments/environment.development';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './group-members.component.html',
  styleUrls: ['./group-members.component.css']
})
export class GroupMembersComponent implements OnInit {
  arrUsers: any = [];
  filteredUsers: any = [];
  groupId: string = '';
  message: string = '';
  groupName: string = ''; // Variable para almacenar el nombre del grupo
  router = inject(Router);

  constructor(
    private groupService: GroupService,
    private route: ActivatedRoute,
  ) { }

  private baseUrl: string = `${environment.apiUrl}/members`;

  ngOnInit() {
    // Obtener el groupId de la ruta
    this.groupId = this.route.snapshot.paramMap.get('id') ?? '';
    if (!this.groupId) {
      console.error('No se pudo obtener el ID del grupo de la ruta');
    } else {
      // Obtener el nombre del grupo
      this.getGroupName();
      // Obtener automáticamente los miembros del grupo al inicializar el componente
      this.getMembersInMyGroups();
    }
  }

  getMembersInMyGroups(): void {
    this.groupService.getMembersInMyGroups(Number(this.groupId)).then((data: any) => {
      if (Array.isArray(data)) {
        this.arrUsers = data;
        this.filteredUsers = this.arrUsers; // Mostrar todos los miembros al principio
        console.log('Miembros del grupo obtenidos:', this.arrUsers);
      } else {
        console.error('El dato recibido no es un arreglo válido', data);
      }
    }).catch((error: any) => {
      console.error('Error al obtener los usuarios', error);
    });
  }

  getGroupName(): void {
    this.groupService.getGroupById(Number(this.groupId)).then((group: any) => {
      this.groupName = group.name; // Suponiendo que 'name' es la propiedad del nombre del grupo
    }).catch((error: any) => {
      console.error('Error al obtener el nombre del grupo', error);
    });
  }


  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
