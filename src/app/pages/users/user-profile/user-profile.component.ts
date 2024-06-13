import { Component } from '@angular/core';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { ProfileSettingComponent } from './profile-setting/profile-setting.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [RouterLink, ProfileInfoComponent, ProfileSettingComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

}
