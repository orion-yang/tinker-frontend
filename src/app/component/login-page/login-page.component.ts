import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/models/user/user';
import { Admin } from 'src/app/models/admin/admin';
import { UserService } from 'src/app/models/user/user.service';
import { AdminService } from 'src/app/models/admin/admin.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  username: string;
  password: string;
  id: number = 8;
  users: User[] = [];
  user!: User;
  admin!: Admin;
  showInvalidLogin: boolean = false;
  errorMessage: string = "Invalid username/password";
  isRememberMe: boolean = false;
  
  constructor(private userService: UserService,
              private adminService: AdminService,
              private router: Router) { 
    this.username = "";
    this.password = "";

  }

  ngOnInit(): void { }


  login() {
    this.userLogin();
    this.adminLogin();
  }

  userLogin() {
    var user:User = {
      id: "",
      firstName: "",
      lastName: "",
      userName: this.username,
      email: "", 
      password: this.password,
      status: "",
      numberOfProjects: 0,
      isVerified: ""
    }

    this.userService.userLogin(user).subscribe(
      (response: User) => {
        if(response.isVerified === "true") {
          if (response.status === "Active") {
            this.showInvalidLogin = false;     
            this.setSessionStorage(response.userName, response.id);
            this.createCookie(response.userName, response.id, 10);
            this.user = response;
            this.router.navigate(['']);
          } else {
            this.errorMessage = "Your account has been suspended!"
            this.showInvalidLogin = true;
          }
          
        } else {
          this.errorMessage = "Your account has not been verified!"
          this.showInvalidLogin = true;
        }
        if(this.isRememberMe) {
          localStorage.setItem('remember-me', 'true');
        }
      },
      (error: HttpErrorResponse) => {
        this.showInvalidLogin = true;
      }
    )
  }

  adminLogin(){
    var admin:Admin = {
      id: "",
      firstName: "",
      lastName: "",
      userName: this.username,
      email: "", 
      password: this.password
    }

    this.adminService.adminLogin(admin).subscribe(
      (response:Admin) => {
        if(this.isRememberMe) {
          localStorage.setItem('remember-me', 'true');
        }
        this.showInvalidLogin = false;
        this.admin = response;
        this.setSessionStorage(response.userName, response.id);
        this.createCookie(response.userName, response.id, 10);
        this.router.navigate(['/admin/profile']);
      },
      (error : HttpErrorResponse) => {
        this.showInvalidLogin = true;
      }
    )
  }

  setSessionStorage(userName: string, id: string) {
    sessionStorage.setItem('userName', userName);
    sessionStorage.setItem('id', id);
  }

  createCookie(userName: string,value: string, minutes: number) {
    if (minutes) {
        var date = new Date();
        date.setMinutes(date.getMinutes() + minutes);
        var expires = "; expires=" + date.toUTCString();
    } else {
        var expires = "";
    }
    document.cookie = userName + "=" + value + expires + ";";
}


  forgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  createAccount() {
    this.router.navigate(['/create-account']);
  }

}
