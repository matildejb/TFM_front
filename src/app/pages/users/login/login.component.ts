
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  formLogin: FormGroup;
  usersService = inject(UsersService);
  router = inject(Router);

  constructor() {
    this.formLogin = new FormGroup({
      email: new FormControl('', [
        // Validators.required,
        // Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/),
        // Procedencia de la expresión regular: la vimos en clase
      ]),
      password: new FormControl('', [
        // Validators.required,
        // Validators.pattern(
        //   /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,16}$/
        // ),
        // Procedencia de la expresión regular (evaluada en Copilot): https://dev.to/fromwentzitcame/username-and-password-validation-using-regex-2175
      ]),
    });
  }

  // // En el login de la API, se genera un error cuando se aplica este método (consultar clase del 22/05 minuto 01:26:00)

  // A partir de aquí da error porque la API no se ha creado todavía

  async onSubmit() {
    try {
      const response = await this.usersService.login(this.formLogin.value);
      localStorage.setItem('token', response.token!);
       Swal.fire({
          title: 'Login exitoso',
          text: '¡Has iniciado sesión correctamente!',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      this.router.navigateByUrl('/summary');
    } catch (err: any) {
        Swal.fire({
        title: 'Error',
        text: 'Usuario o contraseña incorrectos',
        icon: 'error',
        confirmButtonText: 'Inténtalo de nuevo'
      });
    }
  }

  checkControl(
    formControlName: string,
    validador: string
  ): boolean | undefined {
    return (
      this.formLogin.get(formControlName)?.hasError(validador) &&
      this.formLogin.get(formControlName)?.touched
    );
  }
}
