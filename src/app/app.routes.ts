import { Routes } from '@angular/router';
import { WelcomeComponent } from './pages/users/welcome/welcome.component';
import { LandingComponent } from './pages/landing/landing.component';

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
];
