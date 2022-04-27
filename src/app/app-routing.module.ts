import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './component/home-page/home-page.component';
import { FormsModule } from '@angular/forms';
import { LoginPageComponent } from './component/login-page/login-page.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes), FormsModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
