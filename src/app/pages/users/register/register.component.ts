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
import Swal from 'sweetalert2';

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

  // Reutilización del formulario para la actualización de datos
  title: string = 'Registro';
  button: string = 'Registrarse';

  // Mostrar u ocultar contraseña
  passwordFieldType: string = 'password';
  togglePasswordVisibility(): void {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  // Controlador de los validadores
  checkControl(
    formControlName: string,
    validador: string
  ): boolean | undefined {
    return (
      this.formRegister.get(formControlName)?.hasError(validador) &&
      this.formRegister.get(formControlName)?.touched
    );
  }

  constructor() {
    this.formRegister = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-ZÀ-Ÿ][a-zà-ÿ.']*( [A-ZÀ-Ÿ][a-zà-ÿ.']*)*$/),
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
    this.activatedRoute.params.subscribe(async (params: any) => {
      let id: number = params.user_id;
      if (id) {
        this.title = 'Actualización';
        this.button = 'Actualizar';
        let userById: any = await this.usersService.getUserById(id);
        const response: IUser = userById[0];

        this.formRegister = new FormGroup({
          id: new FormControl(response.id, []),
          name: new FormControl(response.name, [
            Validators.required,
            Validators.pattern(/^[A-ZÀ-Ÿ][a-zà-ÿ.']*( [A-ZÀ-Ÿ][a-zà-ÿ.']*)*$/),
            // Procedencia de la expresión regular (posteriormente corregida por ChatGPT para que no incorpore espacios al final): https://regexr.com/3f8cm
          ]),
          username: new FormControl(response.username, [
            Validators.required,
            Validators.pattern(/^[0-9A-Za-z]{6,12}$/),
            // Procedencia de la expresión regular (evaluada en Copilot): https://dev.to/fromwentzitcame/username-and-password-validation-using-regex-2175
          ]),
          phone: new FormControl(response.phone, [
            Validators.required,
            Validators.pattern(
              /^(?:\+34|0034|34)?[ -]?(6|7)([0-9]{1}[ -]?){8}$/
            ),

            // Procedencia de la expresión regular (evaluada en Copilot y posteriormente corregida por ChatGPT para que no exceda el número de caracteres máximo): https://es.stackoverflow.com/questions/415/regex-para-validar-numeros-de-movil-espa%C3%B1oles
          ]),
          email: new FormControl(response.email, [
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
    });
  }

  async onSubmit() {
    if (this.formRegister.value.id) {
      // Para actualizar un usuario existente
      try {
        let response: IUser = await this.usersService.updateProfile(
          this.formRegister.value
        );
        if (response) {
          Swal.fire({
            title: 'Actualización exitosa',
            text: `${response.name} se ha actualizado correctamente`,
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
          });
          this.router.navigateByUrl('/user-profile');
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: 'Error',
          text: 'Ha habido un error con la actualización de usuario',
          icon: 'error',
          confirmButtonText: 'Inténtalo de nuevo',
        });
      }
    } else {
      // Para añadir un nuevo usuario
      try {
        const response = await this.usersService.register(
          this.formRegister.value
        );
        if (response.length > 0) {
          alert(response.join('\n'));
        } else {
          Swal.fire({
            title: 'Registro exitoso',
            text: `Te has registrado correctamente`,
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
          });
          this.router.navigateByUrl('/summary');
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: 'Error',
          text: 'Ha habido un error con el registro de usuario',
          icon: 'error',
          confirmButtonText: 'Inténtalo de nuevo',
        });
      }
    }
  }
}
