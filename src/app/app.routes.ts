import { Routes } from '@angular/router';
import { WelcomeComponent } from './pages/users/welcome/welcome.component';
import { LandingComponent } from './pages/landing/landing.component';
import { ErrorComponent } from './pages/error/error.component';
import { UserProfileComponent } from './pages/users/user-profile/user-profile.component';
import { ProfileInfoComponent } from './pages/users/user-profile/profile-info/profile-info.component';
import { ProfileSettingComponent } from './pages/users/user-profile/profile-setting/profile-setting.component';
import { RegisterComponent } from './pages/users/register/register.component';
import { LoginComponent } from './pages/users/login/login.component';
import { PrivacyComponent } from './pages/settings/privacy/privacy.component';
import { TermsComponent } from './pages/settings/terms/terms.component';
import { AboutComponent } from './pages/settings/about/about.component';

export const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'profile-info/:userId', component: ProfileInfoComponent },
  { path: 'profile-setting', component: ProfileSettingComponent },
  { path: 'settings/privacy', component: PrivacyComponent },
  { path: 'settings/terms', component: TermsComponent },
  { path: 'settings/about', component: AboutComponent },
  { path: 'page-not-found', component: ErrorComponent },
  { path: '**', redirectTo: 'page-not-found' }
];
