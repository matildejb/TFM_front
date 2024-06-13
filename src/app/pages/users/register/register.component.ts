import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { Router } from '@angular/router';
import { IUser } from '../../../interfaces/iuser.interfaces';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  formRegister: FormGroup;
  usersService = inject(UsersService);
  router = inject(Router);
  user: IUser | null = null;
  tipo: string = 'Registro de usuario';
  boton: string = 'Registrarse';

  constructor() {
    this.formRegister = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern(/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/),
        // Procedencia de la expresión regular: https://regexr.com/3f8cm
      ]),
      username: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9A-Za-z]{6,12}$/),
        // Procedencia de la expresión regular (evaluada en Copilot): https://dev.to/fromwentzitcame/username-and-password-validation-using-regex-2175
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}/),
        // Procedencia de la expresión regular (evaluada en Copilot): https://es.stackoverflow.com/questions/415/regex-para-validar-numeros-de-movil-espa%C3%B1oles
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/),
        // Procedencia de la expresión regular: la vimos en clase
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,16}$/
        ),
        // Procedencia de la expresión regular (evaluada en Copilot): https://dev.to/fromwentzitcame/username-and-password-validation-using-regex-2175
      ]),
    });
  }



  async onSubmit() {
    const response = await this.usersService.register(this.formRegister.value);
    if (response.length > 0) {
      alert(response.join('\n'));
    } else {
      alert('Registro OK');
      this.router.navigateByUrl('/welcome'); // Falta por definir la ruta definitiva
    }
  }

  checkControl(
    formControlName: string,
    validador: string
  ): boolean | undefined {
    return (
      this.formRegister.get(formControlName)?.hasError(validador) &&
      this.formRegister.get(formControlName)?.touched
    );
  }
}
