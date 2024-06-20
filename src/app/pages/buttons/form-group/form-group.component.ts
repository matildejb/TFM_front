import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-form-group',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './form-group.component.html',
  styleUrl: './form-group.component.css'
})
export class FormGroupComponent {

formNewGroup: FormGroup;
  router = inject(Router);

    constructor() {
    this.formNewGroup = new FormGroup({
      
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

  checkControl(
    formControlName: string,
    validador: string
  ): boolean | undefined {
    return (
      this.formNewGroup.get(formControlName)?.hasError(validador) &&
      this.formNewGroup.get(formControlName)?.touched
    );
  }
}
