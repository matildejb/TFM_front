import { ActivatedRoute, Router } from "@angular/router";
import { PaymentsService } from "../../../services/payments.service";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Component, inject } from "@angular/core";

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent {
  formNewPayment: FormGroup;
  router = inject(Router);
  paymentService: PaymentsService = inject(PaymentsService);
  members: any[] = [];
  groupId: number | null = null;
  id: number | null = null;


  constructor(private route: ActivatedRoute, private paymentsService: PaymentsService) { // Inject ActivatedRoute
    this.formNewPayment = new FormGroup({
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      amount: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.pattern(/^\d+(\.\d{1,2})?$/) // Solo números positivos con 2 decimales
      ]),
      member: new FormControl('', [Validators.required]),
    });

    this.route.params.subscribe(params => {
      this.groupId = params['id'];
      if (this.groupId) {
        this.getMembersByGroupId(this.groupId); // Llamar al método para obtener los miembros del grupo
      }
    });
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

  async getMembersByGroupId(groupId: number): Promise<void> {
    const id = await this.paymentsService.getGroupById(groupId);
    console.log(id)
    try {
      const members = await this.paymentsService.getMembersInMyGroups(id);
      this.members = members;
    } catch (error) {
      console.error('Error al obtener los miembros del grupo:', error);
    }
  }

  async createNewPayment(): Promise<void> {
    if (this.formNewPayment.invalid) {
      return;
    }
    const newPayment = {
      description: this.formNewPayment.value.description,
      amount: this.formNewPayment.value.amount,
      member: this.formNewPayment.value.member
    };

    try {
      await this.paymentService.createPayment(newPayment);
      // Redirigir a la página del grupo creado o a donde desees
      this.router.navigate(['group/:id']);
      alert('Pago creado correctamente');
    } catch (error) {
      console.error('Error al crear el pago:', error);
    }
  }
}