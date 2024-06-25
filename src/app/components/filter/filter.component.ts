import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GroupService } from '../../services/groups.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  arrUsers: any = [];
  filteredUsers: any = [];
  name: string = '';
  groupId: string = '';
  message: string = '';
  router = inject(Router);

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
    // Obtener todos los usuarios
    this.groupService.getAllUsers().then((allUsers: any) => {
      if (Array.isArray(allUsers)) {
        this.arrUsers = allUsers;
        this.filterUsers(searchTerm); // Ejecutar el filtro después de obtener los usuarios
        console.log('Usuarios obtenidos:', this.arrUsers);
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
      Swal.fire({
        title: 'Error',
        text: this.message,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    } else {
      this.groupService.addMember(this.groupId, user.email).then(response => {
        console.log('Usuario añadido al grupo exitosamente', response);
        Swal.fire({
          text: 'Usuario añadido al grupo correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          this.router.navigate(['/friends']); // Redirigir a la ruta /friends
        });
      }).catch(error => {
        Swal.fire({
          title: 'Error',
          text: 'El miembro ya existe en el grupo o no tienes funciones de administrador.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      });
    }
  }

  onSearchClick(): void {
    this.getMembersInMyGroups(this.name);
  }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
