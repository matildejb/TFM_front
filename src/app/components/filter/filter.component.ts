import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GroupService } from '../../services/groups.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  arrUsers: any = [];
  filteredUsers: any = [];
  name: string = '';
  groupId: string = '';
  message: string = '';

  constructor(
    private groupService: GroupService,
    private httpClient: HttpClient,
    private route: ActivatedRoute,
  ) { }

  private baseUrl: string = `${environment.apiUrl}/members`;

  ngOnInit() {
    // Obtener el groupId de la ruta
    this.groupId = this.route.snapshot.paramMap.get('id') ?? '';
    if (!this.groupId) {
      console.error('No se pudo obtener el ID del grupo de la ruta');
    }
    this.getMembersInMyGroups(); // Cargar los miembros al inicializar
  }

  getMembersInMyGroups(searchTerm: string = ''): void {
    const userId = Number(this.groupId); // Assuming `groupId` is the group ID

    // 1. Get all users
    this.groupService.getAllUsers().then((allUsers: any) => {
      if (Array.isArray(allUsers)) {
        // 2. Get members of the specific group
        this.groupService.getMembersInMyGroups(userId).then((groupMembers: any) => {
          if (Array.isArray(groupMembers)) {
            // 3. Filter users not in the group
            const groupMemberIds = new Set(groupMembers.map((member: any) => member.id));
            this.arrUsers = allUsers.filter((user: any) => !groupMemberIds.has(user.id));
            this.filterUsers(searchTerm); // Execute filtering after getting users
            console.log('Miembros existentes obtenidos:', this.arrUsers);
          } else {
            console.error('El dato recibido de miembros del grupo no es un arreglo válido', groupMembers);
          }
        }).catch((error: any) => {
          console.error('Error al obtener los miembros del grupo', error);
        });
      } else {
        console.error('El dato recibido de todos los usuarios no es un arreglo válido', allUsers);
      }
    }).catch((error: any) => {
      console.error('Error al obtener todos los usuarios', error);
    });
  }

  filterUsers(searchTerm: string): void {
    searchTerm = this.removeAccent(searchTerm.trim().toLowerCase());
    if (searchTerm) {
      this.filteredUsers = this.arrUsers.filter((user: any) => {
        const userName = this.removeAccent(`${user.name}`.toLowerCase());
        return userName.includes(searchTerm);
      });
    } else {
      this.filteredUsers = [];
    }
  }

  removeAccent(palabra: string): string {
    let withoutAccent = palabra.toLowerCase();
    withoutAccent = withoutAccent.replace(/á/g, 'a');
    withoutAccent = withoutAccent.replace(/é/g, 'e');
    withoutAccent = withoutAccent.replace(/í/g, 'i');
    withoutAccent = withoutAccent.replace(/ó/g, 'o');
    withoutAccent = withoutAccent.replace(/ú/g, 'u');
    return withoutAccent;
  }

  onButtonClick(user: any): void {
    if (!this.groupId) {
      this.message = 'No se pudo obtener el ID del grupo';
      console.error(this.message);
    } else {
      this.groupService.addMember(this.groupId, user.email).then(response => {
        console.log('Usuario añadido al grupo exitosamente', response);
        // this.message = 'Usuario añadido al grupo exitosamente';
        alert('Usuario añadido al grupo exitosamente');
      }).catch(error => {
        alert('El usuario ya existe en este grupo.\nAñade a otro usuario.');
      });
    }
  }

  onSearchClick(): void {
    this.getMembersInMyGroups(this.name);
  }
}
