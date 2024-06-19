import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IUser } from '../../../../interfaces/iuser.interfaces';
import { UsersService } from '../../../../services/users.service';

@Component({
  selector: 'app-profile-info',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile-info.component.html',
  // styleUrl: './profile-info.component.css'
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent {

  userService = inject(UsersService);
  activatedRoute = inject(ActivatedRoute);

  unUser: IUser | null = null;


  ngOnInit(): void {
    this.getUserProfile();
  }

  // getUserProfile(): void {
  //   this.userService.getProfile().subscribe(
  //     (data: IUser) => {
  //       this.unUser = data;
  //     },
  //     // (error) => {
  //     (error: any) => {
  //       console.log('Error fetching user profile', error)
  //     }
  //   );

  getUserProfile(): void {
    this.userService.getProfile()
      .then((data: IUser) => {
        this.unUser = data;
      })
      .catch((error: any) => {
        console.log('Error fetching user profile', error);
      });
  }

}

