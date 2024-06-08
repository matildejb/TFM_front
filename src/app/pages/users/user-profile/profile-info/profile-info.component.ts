import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IUser } from '../../../../interfaces/iuser.interfaces';
import { UsersService } from '../../../../services/users.service';

@Component({
  selector: 'app-profile-info',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.css'
})
export class ProfileInfoComponent {

  @Input() unUser: IUser = {
    id: 1,
    name: 'Marco',
    email: 'marco@gmail.com',
    birthDate: '02-05-96',
    phone: '123455',
    password: '12344'
  };

  private userService = inject(UsersService);
  activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params: any) => {
      const id = params.userId;
      try {
        this.unUser = await this.userService.getUserById(id);
      } catch (error) {
        console.log(error);
      }

    })
  }

  }

