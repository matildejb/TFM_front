import { Routes } from '@angular/router';
import { WelcomeComponent } from './pages/users/welcome/welcome.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'welcome' },
  { path: 'welcome', component: WelcomeComponent },
];
