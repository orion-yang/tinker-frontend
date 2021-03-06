import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginPageComponent } from './component/login-page/login-page.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { ProjectsComponent } from './component/projects/projects.component';
import { ProfileComponent } from './component/profile/profile.component';
import { CreateAccountComponent } from './component/create-account/create-account.component';
import { AboutPageComponent } from './component/about-page/about-page.component';
import { LikedProjectsComponent } from './component/liked-projects/liked-projects.component';
import { UserProjectsComponent } from './component/user-projects/user-projects.component';
import { DatePipe } from '@angular/common';
import { AdminProfileComponent } from './component/admin-profile/admin-profile.component';
import { ManageUsersComponent } from './component/manage-users/manage-users.component';
import { AgGridModule } from 'ag-grid-angular';
import { ManageProjectsComponent } from './component/manage-projects/manage-projects.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent,
    ForgotPasswordComponent,
    ProjectsComponent,
    ProfileComponent,
    CreateAccountComponent,
    AboutPageComponent,
    LikedProjectsComponent,
    UserProjectsComponent,
    AdminProfileComponent,
    ManageUsersComponent,
    ManageProjectsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    AgGridModule.withComponents([])
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
