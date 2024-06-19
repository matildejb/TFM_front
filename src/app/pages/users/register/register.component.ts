import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../../../interfaces/iuser.interfaces';
import { UsersService } from '../../../services/users.service';


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
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  user: IUser | null = null;

  // Mostrar u ocultar contraseña
  passwordFieldType: string = 'password';

  togglePasswordVisibility(): void {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  // Solución de Matilde para la reutilización del formulario
  tipo: string = 'Registro de usuario';
  boton: string = 'Registrarse';

  constructor() {
    this.formRegister = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^\b([A-ZÀ-ÿ][-,a-z. ']*)+( [A-ZÀ-ÿ][-,a-z. ']*)*\b$/
        ),
        // Procedencia de la expresión regular (posteriormente corregida por ChatGPT para que no incorpore espacios al final): https://regexr.com/3f8cm
      ]),
      username: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9A-Za-z]{6,12}$/),
        // Procedencia de la expresión regular (evaluada en Copilot): https://dev.to/fromwentzitcame/username-and-password-validation-using-regex-2175
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?:\+34|0034|34)?[ -]?(6|7)([0-9]{1}[ -]?){8}$/),

        // Procedencia de la expresión regular (evaluada en Copilot y posteriormente corregida por ChatGPT para que no exceda el número de caracteres máximo): https://es.stackoverflow.com/questions/415/regex-para-validar-numeros-de-movil-espa%C3%B1oles
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

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe((params: any) => {
    //   let id: string = params.userId
    //   let response = this.usersService.getProfile(id)
    //   console.log(response);
    // })
  }

  async onSubmit() {
    const response = await this.usersService.register(this.formRegister.value);
    if (response.length > 0) {
      alert(response.join('\n'));
    } else {
      alert('Registro OK');
      this.router.navigateByUrl('/summary'); // Falta por definir la ruta definitiva
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

  //   // Matilde
  //   getUserProfile(): void {
  //     this.usersService.getProfile().subscribe(
  //       (data: IUser) => {
  //         this.user = data;
  //         this.formRegister.patchValue(data); // Set form values with user data
  //       },
  //       (error) => {
  //         console.log('Error fetching user profile', error);
  //       }
  //     );
  //   }
}
