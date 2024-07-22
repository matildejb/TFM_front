import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IGroup } from '../../../interfaces/igroup.interfaces';
import { GroupService } from '../../../services/groups.service';
import Swal from 'sweetalert2';

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
  groupService: GroupService = inject(GroupService);

  constructor() {
    this.formNewGroup = new FormGroup({

      title: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(250),
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


  // Método para crear un nuevo grupo
  async createNewGroup(): Promise<void> {
    if (this.formNewGroup.invalid) {
      return;
    }
    const newGroup: IGroup = {
      title: this.formNewGroup.value.title,
      description: this.formNewGroup.value.description,
    };

    try {
      await this.groupService.createGroup(newGroup);
      Swal.fire({
        icon: 'success',
        text: 'Grupo creado correctamente',
        confirmButtonText: 'OK'
      }).then(() => {
        // Redireccionar a la página del grupo creado 
        this.router.navigate(['/groupsList']); 
      });
    
    } catch (error) {
      console.error('Error al crear el grupo:', error);
      // Aquí puedes manejar el error como lo consideres adecuado
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al crear el grupo. Por favor, inténtalo de nuevo.',
        confirmButtonText: 'OK'
      });
    }

  }
}
