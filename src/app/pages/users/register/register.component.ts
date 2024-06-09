import { Component, inject, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {

  @Input() showSubmitButton: boolean = true;
  @Input() showHeader: boolean = true; 
     
  formRegister: FormGroup;

  formBuilder = inject(FormBuilder);
  usersService = inject(UsersService);
  router = inject(Router);

  constructor() {
    this.formRegister = this.formBuilder.group({
      name: [null, Validators.required],
      email: null,
      password: null,
      phone: null,
    });
  }

  async onSubmit() {
    const response = await this.usersService.register(this.formRegister.value);
    // A partir de aquí da error porque la API no se ha creado todavía
    // if (response.length > 0) {
    //   alert(response.join('\n'));
    // } else {
    //   alert('Registro OK');
    //   this.router.navigateByUrl("/login")
    // }
  }
}
