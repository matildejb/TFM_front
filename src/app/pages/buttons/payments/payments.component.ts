import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent {
formPayment: FormGroup;
  router = inject(Router);
  paymentService: any;

    constructor() {
    this.formPayment = new FormGroup({
      description: new FormControl('', [
        // Validators.required,
        // Validators.minLength(3),
        // Validators.maxLength(50),
      ]),
      amount: new FormControl('', [
        // Validators.required,
        // Validators.min(1),
        //Validators.pattern(/^\d+(\.\d{1,2})?$/) // Solo números positivos con 2 decimales
      ]),
    });
}
async onSubmit() {
    try {
      // Llama al servicio para enviar los datos al servidor
      const response = await this.paymentService.sendPaymentData(this.formPayment.value);
      localStorage.setItem('token', response.token!);
      alert(response.message);
      this.router.navigateByUrl('/payments');
    } catch (err: any) {
      alert(err.error.error);
    }
  }

  checkControl(
    formControlName: string,
    validador: string
  ): boolean | undefined {
    return (
      this.formPayment.get(formControlName)?.hasError(validador) &&
      this.formPayment.get(formControlName)?.touched
    );
  }
}
