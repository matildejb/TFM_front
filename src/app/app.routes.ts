import { Routes } from '@angular/router';
import { WelcomeComponent } from './pages/users/welcome/welcome.component';
import { LandingComponent } from './pages/landing/landing.component';
import { ErrorComponent } from './pages/error/error.component';
import { UserProfileComponent } from './pages/users/user-profile/user-profile.component';
import { ProfileInfoComponent } from './pages/users/user-profile/profile-info/profile-info.component';
import { ProfileSettingComponent } from './pages/users/user-profile/profile-setting/profile-setting.component';

export const routes: Routes = [
  {

    //Configuración rutas,
    //al tener dos rutas con el mismo  path: '' (vacio)
    //Genera un conflicto y no se visualiza la landing al abrir app 
    //he puesto users, COMENTARLO!!!
    path: 'users',
    loadChildren: () =>
      import('./pages/users/users.routes').then((m) => m.USERS_ROUTES),
  },
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'profile-info', component: ProfileInfoComponent },
  { path: 'profile-setting', component: ProfileSettingComponent },
  { path: 'page-not-found', component: ErrorComponent },
  { path: '**', redirectTo: '/page-not-found' }
];
