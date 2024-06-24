import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IGroup } from '../../../interfaces/igroup.interfaces';
import { GroupService } from '../../../services/groups.service';

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
      // Redireccionar a la página del grupo creado o a donde desees
      this.router.navigate(['/groupsList']); // Ejemplo de redirección a la lista de grupos
      alert('Grupo creado correctamente');
    } catch (error) {
      console.error('Error al crear el grupo:', error);
      // Aquí puedes manejar el error como lo consideres adecuado
    }
  }

}
