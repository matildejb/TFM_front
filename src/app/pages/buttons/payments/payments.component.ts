import { ActivatedRoute, Router } from "@angular/router";
import { PaymentsService } from "../../../services/payments.service";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Component, inject } from "@angular/core";
import { CommonModule } from '@angular/common';
import { IPayment } from "../../../interfaces/ipayments.interfaces";

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent {
  formNewPayment: FormGroup;
  router = inject(Router);
  paymentService: PaymentsService = inject(PaymentsService);
  members: any[] = [];
  // groupId: number | null = null;
  groupId: number = 0;


  constructor(private route: ActivatedRoute) {
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
      payer: new FormControl('', [Validators.required]),
      payee: new FormControl([], [Validators.required]) // payee como un arreglo para el select múltiple
    });

    this.route.params.subscribe(params => {
      this.groupId = +params['id'];
      if (this.groupId) {
        this.getMembersByGroupId(this.groupId);
      }
    });

    // React to changes in the payer control to update the payee options
    this.formNewPayment.get('payer')?.valueChanges.subscribe(payerId => {
      this.updatePayeeOptions(payerId);
    });
  }

  async ngOnInit(): Promise<void> {
    if (this.groupId) {
      await this.getMembersByGroupId(this.groupId);
    }
  }

  async getMembersByGroupId(groupId: number): Promise<void> {
    try {
      const members = await this.paymentService.getMembersInMyGroups(groupId);
      this.members = members.map((member: any) => member.username);
    } catch (error) {
      console.error('Error al obtener los miembros del grupo:', error);
    }
  }

  updatePayeeOptions(payerId: number) {
    const payeeControl = this.formNewPayment.get('payee');
    if (payeeControl) {
      payeeControl.setValue([]);
      // Filter out the payer from the payee options
      const filteredMembers = this.members.filter(member => member.id !== payerId);
      this.members = filteredMembers.map(member => member.name); // Solo mantener los nombres
    }
  }

  async createNewPayment(): Promise<void> { // Método para crear un nuevo pago en el grupo
    // if (this.formNewPayment.invalid) { // Si el formulario es inválido, no hacer nada
    //   return;
    // }

    const newPayment: IPayment = { // Crear un objeto con los datos del nuevo pago a partir de los valores del formulario de nuevo pago
      description: this?.formNewPayment.value.description, // Obtener la descripción del formulario
      amount: this?.formNewPayment.value.amount, // Obtener el monto del formulario
      paid_by: this?.formNewPayment.value.payer.id, // Obtener el ID del pagador del formulario (ya que el formulario tiene el objeto completo)
      participants: this?.formNewPayment.value.payee.map((id: any) => ({ userId: id })) // Convertir a la estructura esperada por el backend
    };

    try {
      await this.paymentService.createPayment(this.groupId, newPayment); // Crear el pago en el backend con el nuevo pago y el ID del grupo actual 
      this.router.navigate([`group/${this.groupId}`]); // Redirigir al grupo actual después de crear el pago con éxito 
      alert('Pago creado correctamente');
    } catch (error) {
      console.error('Error al crear el pago:', error);
      alert('Error al crear el pago!');
    }
  }

  // async createNewPayment(): Promise<void> {
  //   if (this.formNewPayment.invalid) {
  //     return;
  //   }

  //   const newPayment = {
  //     description: this.formNewPayment.value.description,
  //     amount: this.formNewPayment.value.amount,
  //     payer: this.formNewPayment.value.payer,
  //     participants: this.formNewPayment.value.payee.map((id: any) => ({ userId: id })) // Convertir a la estructura esperada por el backend
  //   };

  //   try {
  //     await this.paymentService.createPayment(this.groupId, newPayment);
  //     this.router.navigate([`group/${this.groupId}`]);
  //     alert('Pago creado correctamente');
  //   } catch (error) {
  //     console.error('Error al crear el pago:', error);
  //     alert('Error al crear el pago');
  //   }
  // }
}


