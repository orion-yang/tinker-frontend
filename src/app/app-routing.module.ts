import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './component/home-page/home-page.component';
import { FormsModule } from '@angular/forms';
import { LoginPageComponent } from './component/login-page/login-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'login', component: LoginPageComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes), FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
