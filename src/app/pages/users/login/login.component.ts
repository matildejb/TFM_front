import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  formLogin: FormGroup;

  formBuilder = inject(FormBuilder);
  usersService = inject(UsersService);
  router = inject(Router);

  constructor() {
    this.formLogin = this.formBuilder.group({
      email: null,
      password: null,
    });
  }

  // // En el login de la API, se genera un error cuando se aplica este método (consultar clase del 22/05 minuto 01:26:00)

  // A partir de aquí da error porque la API no se ha creado todavía

  async onSubmit() {
    try {
      const response = await this.usersService.login(this.formLogin.value);
      localStorage.setItem('token', response.token!);
      alert(response.message);
      this.router.navigateByUrl('nombre de la URL de la página de inicio');
    } catch (err: any) {
      alert(err.error.error);
    }
  }
}
