import { Component, inject } from '@angular/core';
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

   userService = inject(UsersService);
  activatedRoute = inject(ActivatedRoute);

  unUser: IUser = {
  id: 0,
  name: '',
  email: '',
  username: '',
  phone: undefined,
  password: '',
  imageUrl: ''
  };

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params: any) => {
      const id = params.userId;
      try {
        this.unUser = await this.userService.getUserById(id);
      } catch (error) {
        console.log(error);
      }

    });
  }

  }

