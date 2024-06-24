import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GroupService } from '../../../services/groups.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { ActivatedRoute } from '@angular/router';
import { PaymentsService } from '../../../services/payments.service';
import { IPayment } from '../../../interfaces/ipayments.interfaces';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: '../payments/payments.component.html',
  styleUrls: ['../payments/payments.component.css']
})
export class PaymentsComponent implements OnInit {
  arrUsers: any = [];
  groupId: any;
  message: string = '';
  newPayment: any = {};

  constructor(
    private groupService: GroupService,
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private paymentService: PaymentsService,
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

  getMembersInMyGroups(): void {
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

  //   createPayment(group_id: number, payment: any): void { // Assuming `IPayment` is imported from the interface file

  //     const newPayment: IPayment = { // Crear un objeto con los datos del nuevo pago a partir de los valores del formulario de nuevo pago
  //       description: this?.newPayment.value.description, // Obtener la descripción del formulario
  //       amount: this?.newPayment.value.amount, // Obtener el monto del formulario
  //       paid_by: this?.newPayment.value.payer.id, // Obtener el ID del pagador del formulario (ya que el formulario tiene el objeto completo)
  //       participants: this?.newPayment.value.payee.map((id: any) => ({ userId: id })) // Convertir a la estructura esperada por el backend
  //     };
  //     console.log(newPayment);

  //     try {
  //       this.paymentService.createPayment(group_id, newPayment).then(response => { // Crear el pago en el backend con el nuevo pago y el ID del grupo actual y manejar la respuesta
  //         console.log('Pago creado exitosamente', response);
  //         alert('Pago creado exitosamente');
  //       }).catch(error => {
  //         alert('Error al crear el pago');
  //       });
  //     }
  //     catch (error) {
  //       console.error('Error al crear el pago:', error);
  //       alert('Error al crear el pago');
  //     }
  //   }
  // }

  createPayment(group_id: number, newPaymentData: any): void {
    // Construir el objeto de pago según la estructura requerida por el backend
    const newPayment: any = {
      amount: newPaymentData.amount,
      description: newPaymentData.description,
      paid_by: newPaymentData.paid_by,
      participants: newPaymentData.payee.map((id: any) => ({ userId: id }))
    };
    console.log(newPayment);

    try {
      this.paymentService.createPayment(group_id, newPayment).then(response => {
        console.log('Pago creado exitosamente', response);
        alert('Pago creado exitosamente');
      }).catch(error => {
        console.error('Error al crear el pago:', error);
        alert('Error al crear el pago');
      });
    } catch (error) {
      console.error('Error al crear el pago:', error);
      alert('Error al crear el pago');
    }
  }
}





// async createNewPayment(): Promise < void> { // Método para crear un nuevo pago en el grupo
//   // if (this.formNewPayment.invalid) { // Si el formulario es inválido, no hacer nada
//   //   return;
//   // }
//   try {
//     await this.paymentService.createPayment(this.groupId, newPayment); // Crear el pago en el backend con el nuevo pago y el ID del grupo actual
//     this.router.navigate([`group/${this.groupId}`]); // Redirigir al grupo actual después de crear el pago con éxito
//     alert('Pago creado correctamente');
//   } catch(error) {
//     console.error('Error al crear el pago:', error);
//     alert('Error al crear el pago!');
//   }
// }



// ### Crear un pago
// POST { { HOST } } /api/payments / 22 / create
// Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxNCwiZXhwIjoxNzIxNzA0MTI3LCJpYXQiOjE3MTkxMTIxMjd9.PXX0jv6GMWQfBjXkA5 - Xo6kMTYrmGQfcPjg_usPkR2c
// Content - Type: application / json

// {
//   "amount": 100,
//     "description": "Una prueba de pagos",
//       "paid_by": 14,
//         "participants": [
//           { "userId": 29 }
//         ]
// }





// ///

// his.activatedRoute.params.subscribe(async (params: any) => {
//   let id: number = params.user_id;
//   if (id) {
//     this.title = 'Actualización';
//     this.button = 'Actualizar';
//     let userById: any = await this.usersService.getUserById(id);
//     const response: IUser = userById[0];