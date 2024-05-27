import { Routes } from '@angular/router';
import { WelcomeComponent } from './pages/users/welcome/welcome.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/users/users.routes').then((m) => m.USERS_ROUTES),
  },
  { path: 'welcome', component: WelcomeComponent },
];
