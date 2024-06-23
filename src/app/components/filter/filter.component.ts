// import { Component, inject, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { GroupService } from '../../services/groups.service';
// import { HttpClient } from '@angular/common/http';
// import { environment } from '../../../environments/environment.development';
// import { ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-filter',
//   standalone: true,
//   imports: [FormsModule, CommonModule],
//   templateUrl: './filter.component.html',
//   styleUrls: ['./filter.component.css']
// })
// export class FilterComponent implements OnInit {
//   arrUsers: any = [];
//   filteredUsers: any = [];
//   name: string = '';
//   groupId: string = '';
//   message: string = '';

//   private groupService = inject(GroupService);
//   private httpClient = inject(HttpClient);
//   private route = inject(ActivatedRoute);

//   private baseUrl: string = `${environment.apiUrl}/members`;

//   ngOnInit() {
//     // Obtener el groupId de la ruta
//     this.groupId = this.route.snapshot.paramMap.get('id') ?? '';
//     if (this.groupId) {
//       this.groupId = this.groupId;
//     } else {
//       console.error('No se pudo obtener el ID del grupo de la ruta');
//     }
//   }


//   getAllUsers(): void {
//     this.groupService.getAllUsers().then((data: any) => {
//       if (Array.isArray(data)) {
//         this.arrUsers = data;
//         this.filterUsers(); // Filtrar los usuarios después de obtenerlos
//       } else {
//         console.error('El dato recibido no es un arreglo válido', data);
//       }
//       console.log(this.filteredUsers);
//     }).catch((error: any) => {
//       console.error('Error al obtener los usuarios', error);
//     });
//   }

//   filterUsers(): void {
//     const searchTerm = this.removeAccent(this.name.trim().toLowerCase());
//     if (searchTerm) {
//       this.filteredUsers = this.arrUsers.filter((user: any) => {
//         const userName = this.removeAccent(`${user.name}`.toLowerCase());
//         return userName.includes(searchTerm);
//       });
//     } else {
//       this.filteredUsers = this.arrUsers;
//     }
//   }

//   removeAccent(palabra: string): string {
//     let withouAccent = palabra.toLowerCase();
//     withouAccent = withouAccent.replace(/á/g, 'a');
//     withouAccent = withouAccent.replace(/é/g, 'e');
//     withouAccent = withouAccent.replace(/í/g, 'i');
//     withouAccent = withouAccent.replace(/ó/g, 'o');
//     withouAccent = withouAccent.replace(/ú/g, 'u');
//     return withouAccent;
//   }

//   onButtonClick(user: any): void {
//     if (!this.groupId) {
//       this.message = 'No se pudo obtener el ID del grupo';
//       console.error(this.message);
//       return;
//     }

//     const url = `${this.baseUrl}/${this.groupId}`;

//     this.httpClient.post(url, { email: user.email }).subscribe({
//       next: (response) => {
//         console.log('Usuario añadido al grupo exitosamente', response);
//         this.message = 'Usuario añadido al grupo exitosamente';
//       },
//       error: (error) => {
//         console.error('Error al añadir el usuario al grupo', error);
//         this.message = 'Error al añadir el usuario al grupo';
//       }
//     });
//   }
// }









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
  }

  getAllUsers(): void {
    this.groupService.getAllUsers().then((data: any) => {
      if (Array.isArray(data)) {
        this.arrUsers = data;
        this.filterUsers();
      } else {
        console.error('El dato recibido no es un arreglo válido', data);
      }
    }).catch((error: any) => {
      console.error('Error al obtener los usuarios', error);
    });
  }

  filterUsers(): void {
    const searchTerm = this.removeAccent(this.name.trim().toLowerCase());
    if (searchTerm) {
      this.filteredUsers = this.arrUsers.filter((user: any) => {
        const userName = this.removeAccent(`${user.name}`.toLowerCase());
        return userName.includes(searchTerm);
      });
    } else {
      this.filteredUsers = this.arrUsers;
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
        this.message = 'Usuario añadido al grupo exitosamente';
        alert('Usuario añadido al grupo exitosamente');
      }).catch(error => {
        console.error('Error al añadir el usuario al grupo', error);
        this.message = 'Error al añadir el usuario al grupo';
      });
    }

    // async addMember(userId: number, groupId: string): Promise<void> {
    //   try {
    //     // Obtener el email del usuario usando su ID
    //     const email = await this.groupService.getUserEmail(userId);
    //     console.log(`Email del usuario con ID ${userId}: ${email}`);

    //     // Asegurarse de que se obtuvo un email válido
    //     if (email) {
    //       // Añadir al usuario como miembro del grupo
    //       await this.groupService.addMember(groupId, email);
    //       console.log(`Usuario con email ${email} añadido al grupo con ID ${groupId} correctamente`);
    //     } else {
    //       console.error('No se pudo obtener el email del usuario');
    //     }
    //   } catch (error) {
    //     console.error('Error al añadir el usuario al grupo', error);
    //   }
    // }
  }
}