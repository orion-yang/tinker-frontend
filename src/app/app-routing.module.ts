import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './component/home-page/home-page.component';
import { FormsModule } from '@angular/forms';
import { LoginPageComponent } from './component/login-page/login-page.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { UserProjectsComponent } from './component/user-projects/user-projects.component';
import { LikedProjectsComponent } from './component/liked-projects/liked-projects.component';
import { CreateAccountComponent } from './component/create-account/create-account.component';
import { ProjectsComponent } from './component/projects/projects.component';
import { ProfileComponent } from './component/profile/profile.component';
import { AboutPageComponent } from './component/about-page/about-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'about-page', component: AboutPageComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'user-projects', component: UserProjectsComponent},
  { path: 'liked-projects', component: LikedProjectsComponent},

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes), FormsModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
