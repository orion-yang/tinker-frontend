import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/app/models/admin/admin';
import { AdminService } from 'src/app/models/admin/admin.service';
import { EmailResponse } from 'src/app/models/email/email';
import { EmailService } from 'src/app/models/email/email.service';
import { VerificationToken } from 'src/app/models/email/verification-token';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/models/user/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  user!: User;
  admin!: Admin;
  validCode: boolean = false;
  emailSent: boolean = false;
  invalidEmail: boolean = false;
  enteredWrongCode: boolean = false;
  emailAddress: string = "";
  newPassword: string = "";
  verificationCode: string = "";
  typedVerificationCode: string = "";
  verificationToken!: VerificationToken;


  
  constructor(private userService : UserService, 
              private adminService : AdminService,
              private emailService : EmailService,
              private router: Router) { 
      
  }

  ngOnInit(): void {

  } 

  public sendVerificationCode() {
    
    this.verificationCode = this.getRandomString(6);
    console.log(this.verificationCode);
    console.log(this.emailAddress);

    this.verificationToken = {
      verificationCode: this.verificationCode,
      email: this.emailAddress
    }

    this.emailService.sendResetPassword(this.verificationToken).subscribe(
      (response: EmailResponse) => {
        console.log(response);
        if (response.message === "Success") {
          this.emailSent = true;
          this.invalidEmail = false;
        }
        if  (response.message === "Failed") {
          this.emailSent = false;
          this.invalidEmail = true;
        }
      }
    )
  }

  public verifyConfirmationCode() {
    console.log(this.verificationCode);
    if (this.verificationCode === this.typedVerificationCode) {
      this.validCode = true;
      this.enteredWrongCode = false;
      this.typedVerificationCode = "";
    } else {
      this.enteredWrongCode = true;
    }
    
  }

  public savePassword() {
    this.saveUserPassword();
    this.saveAdminPassword();

  }

  saveUserPassword() {
    this.userService.findByEmail(this.emailAddress).subscribe(
      (response: User) => {
        this.user = response;
        this.user.password = this.newPassword;
        this.userService.updatePassword(this.user).subscribe(
          (response : User) => {
            this.router.navigate(['/login']);
          }
        )
      },
      (error : any) => {
        console.log(error);
      }
    )
    
  }

  saveAdminPassword() {
    this.adminService.findByEmail(this.emailAddress).subscribe(
      (response : Admin) => {
        this.admin = response;
        this.admin.password = this.newPassword;
        this.adminService.updatePassword(this.admin).subscribe(
          (response : Admin) => {
            this.router.navigate(['/login']);
          }
        );
      },
      (error : any) => {
        console.log(error);
      }
    );


  }

  public getRandomString(length: number): string {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }

}
