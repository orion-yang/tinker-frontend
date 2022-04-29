import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmailResponse } from 'src/app/models/email/email';
import { EmailService } from 'src/app/models/email/email.service';
import { VerificationToken } from 'src/app/models/email/verification-token';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/models/user/user.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  firstName:string = "";
  lastName: string = "";
  userName: string = "";
  email: string = ""; 
  password: string = "";
  status: string = "";

  termsAgreed: boolean = false;
  message: string = "";

  nameOnCard: string = "";
  cardNumber: string = "";
  card_type: string = "";
  expiration_date: string = "";
  billingAddress: string = "";

  verificationCode: string = "";
  typedVerificationCode: string = "";
  verificationToken!: VerificationToken;
  validCode: boolean = false;
  emailSent: boolean = false;
  invalidEmail: boolean = false;
  enteredWrongCode: boolean = false;
  showMainForm: boolean = true;

  user!: User;

  constructor(private userService: UserService, 
              private router: Router, 
              private emailService : EmailService,) {
    
  }

  ngOnInit(): void {
  }

  createAccount() {
    
  }

  public onAddUser(): void {
    if(this.firstName && this.lastName && this.userName && this.email && this.password){
      if (this.termsAgreed) {
        var newUser: User = {
          id: '',
          firstName: this.firstName,
          lastName: this.lastName,
          userName: this.userName,
          email: this.email,
          password: this.password,
          status: "Active",
          isVerified: "false",
          numberOfProjects: 0
        }

        this.userService.addUser(newUser).subscribe(
          (response: User) => {
            this.user = response;
            this.sendVerificationCode(response.email);
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      } else {
        this.message = "Must agree to Terms and Conditions and Privacy Policies";
      }
  }else{
    this.message = "*Information is missing. Please fill out the required information.*";
    }
    
  }

  public sendVerificationCode(email: string) {
    
    this.verificationCode = this.getRandomString(6);
    console.log(this.verificationCode);
    console.log(this.email);

    this.verificationToken = {
      verificationCode: this.verificationCode,
      email: this.email
    }

    this.emailService.sendVerifyUser(this.verificationToken).subscribe(
      (response: EmailResponse) => {
        console.log(response);
        if (response.message === "Success") {
          this.emailSent = true;
          this.showMainForm = false;
          this.invalidEmail = false;
        }
        if  (response.message === "Failed") {
          this.emailSent = false;
          this.invalidEmail = true;
        }
      }
    )
  }

  public getRandomString(length: number): string {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }

  public verifyConfirmationCode() {
    console.log(this.verificationCode);
    if (this.verificationCode === this.typedVerificationCode) {
      this.validCode = true;
      this.enteredWrongCode = false;
      this.typedVerificationCode = "";
      localStorage.setItem('userName', this.user.userName);
      localStorage.setItem('id', this.user.id);
      this.user.isVerified = "true";
      this.userService.updateUser(this.user).subscribe(
        (response:User) => {
          this.user = response;
        }
      )
      this.router.navigate(['']);
    } else {
      this.enteredWrongCode = true;
    }
    
  }
}
