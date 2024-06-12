import { Routes } from '@angular/router';
import { WelcomeComponent } from './pages/users/welcome/welcome.component';
import { LandingComponent } from './pages/landing/landing.component';
import { ErrorComponent } from './pages/error/error.component';
import { LoginComponent } from './pages/users/login/login.component';
import { RegisterComponent } from './pages/users/register/register.component';
import { GroupsListComponent } from './pages/groups-list/groups-list.component';
import { GroupComponent } from './components/group/group.component';
import { SummaryComponent } from './pages/summary/summary.component';
import { FriendsComponent } from './pages/friends/friends.component';


export const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'groupsList', component: GroupsListComponent },
  { path: 'group/:id', component: GroupComponent },
  { path: 'friends', component: FriendsComponent},
  { path: 'summary', component: SummaryComponent },
  { path: 'page-not-found', component: ErrorComponent },
  { path: '**', redirectTo: '/page-not-found' },
];