import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GroupService } from '../../../services/groups.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PaymentsService } from '../../../services/payments.service';
import { IPayment } from '../../../interfaces/ipayments.interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: '../payments/payments.component.html',
  styleUrls: ['../payments/payments.component.css']
})
export class PaymentsComponent implements OnInit {
  arrUsers: any = [];
  groupId: any;
  message: string = '';
  newPayment: any = {};
  formNewPayment: FormGroup;
  // router = inject(Router);
  filteredUsers: any = [];
  groupName: string = '';

  constructor(
    private groupService: GroupService,
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private paymentService: PaymentsService,
    private router: Router
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
    this.getMembersInMyGroup(); // Cargar los miembros al inicializar
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

  getMembersInMyGroup(): void {
    this.groupService.getAllMembers(Number(this.groupId)).then((data: any) => {
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
      this.groupName = group.name;
    }).catch((error: any) => {
      console.error('Error al obtener el nombre del grupo', error);
    });
  }

  onButtonClick(user: any): void {
    if (!this.groupId) {
      this.message = 'No se pudo obtener el ID del grupo';
      console.error(this.message);
    } else {
      this.paymentService.createPayment(this.groupId, user).then(response => {
        Swal.fire({
          text: 'Gasto añadido al grupo correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          this.router.navigateByUrl(`groupList`);
        });
      }).catch(error => {
        Swal.fire({
          title: 'Error',
          text: 'El usuario pagador no puede estar incluido dentro de los participantes.\nAñade otro usuario.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
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