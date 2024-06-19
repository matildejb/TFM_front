import { Routes } from '@angular/router';
import { WelcomeComponent } from './pages/users/welcome/welcome.component';
import { LandingComponent } from './pages/landing/landing.component';
import { ErrorComponent } from './pages/error/error.component';
import { UserProfileComponent } from './pages/users/user-profile/user-profile.component';
import { RegisterComponent } from './pages/users/register/register.component';
import { LoginComponent } from './pages/users/login/login.component';
import { PrivacyComponent } from './pages/settings/privacy/privacy.component';
import { TermsComponent } from './pages/settings/terms/terms.component';
import { AboutComponent } from './pages/settings/about/about.component';
import { GroupsListComponent } from './pages/groups-list/groups-list.component';
import { GroupComponent } from './components/group/group.component';
import { SummaryComponent } from './pages/summary/summary.component';
import { loginGuard } from './guards/login.guard';
import { redirectGuard } from './guards/redirect.guard';
import { FriendsComponent } from './pages/friends/friends.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';

export const routes: Routes = [
  { path: 'updateUser/:userId', component: RegisterComponent },
  { path: '', pathMatch: 'full', redirectTo: '/landing' },
  { path: 'landing', component: LandingComponent, canActivate: [redirectGuard] },
  { path: 'welcome', component: WelcomeComponent, canActivate: [redirectGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [redirectGuard] },
  { path: 'login', component: LoginComponent, canActivate: [redirectGuard] },
 
  { path: 'user-profile', component: UserProfileComponent, canActivate: [loginGuard] },
  { path: 'settings/privacy', component: PrivacyComponent, canActivate: [loginGuard]},
  { path: 'settings/terms', component: TermsComponent, canActivate: [loginGuard] },
  { path: 'settings/about', component: AboutComponent, canActivate: [loginGuard]},
  { path: 'group/:id', component: GroupComponent, canActivate: [loginGuard] },
  { path: 'groupsList', component: GroupsListComponent, canActivate: [loginGuard] },
  { path: 'summary', component: SummaryComponent, canActivate: [loginGuard] },
  { path: 'friends', component: FriendsComponent, canActivate: [loginGuard] },
  { path: 'statistics', component: StatisticsComponent, canActivate: [loginGuard] },
  { path: 'page-not-found', component: ErrorComponent },
  { path: '**', redirectTo: 'page-not-found' },
];
