import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GroupService } from '../../../services/groups.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentsService } from '../../../services/payments.service';
import { IPayment } from '../../../interfaces/ipayments.interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: '../payments/payments.component.html',
  styleUrls: ['../payments/payments.component.css']
})
export class PaymentsComponent implements OnInit {
  arrUsers: any = [];
  groupId: any;
  message: string = '';
  newPayment: any = {};
  formNewPayment: FormGroup;
  router = inject(Router);

  constructor(
    private groupService: GroupService,
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private paymentService: PaymentsService,
  ) {

    this.formNewPayment = new FormGroup({
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      amount: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.pattern(/^\d+(\.\d{1,2})?$/)
      ]),
      payer: new FormControl('', [ // Añade validadores al primer select (payer)
        Validators.required
      ]),
      payee: new FormControl('', [ // Añade validadores al segundo select (payee)
        Validators.required
      ])
    });
  }

  private baseUrl: string = `${environment.apiUrl}/members`;

  ngOnInit() {
    // Obtener el groupId de la ruta
    this.groupId = this.route.snapshot.paramMap.get('id') ?? '';
    if (!this.groupId) {
      console.error('No se pudo obtener el ID del grupo de la ruta');
    }
    this.getMembersInMyGroups(); // Cargar los miembros al inicializar
  }

  checkControl(
    formControlName: string,
    validador: string
  ): boolean | undefined {
    return (
      this.formNewPayment.get(formControlName)?.hasError(validador) &&
      this.formNewPayment.get(formControlName)?.touched
    );
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
        Swal.fire({
        text: 'Pago creado exitosamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
      }).catch(error => {
        console.error('Error al crear el pago:', error);
        alert('Error al crear el pago');
      });
    } catch (error) {
      console.error('Error al crear el pago:', error);
      alert('Error al crear el pago');
    }
  }



  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}