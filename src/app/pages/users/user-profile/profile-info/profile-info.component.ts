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

   userService = inject(UsersService);
  activatedRoute = inject(ActivatedRoute);
  

  @Input() unUser: IUser = {
    //DEBERIA IR VACIO ESTE ARRAY
    id: 1,
    first_name: 'Marco',
    last_name: 'Aurelio',
    email: 'marco@gmail.com',
    username: 'marcopolo',
    phone: 123455,
    password: '12344',
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

