import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmailResponse } from 'src/app/models/email/email';
import { EmailService } from 'src/app/models/email/email.service';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/models/user/user.service';
import { faUser, faHome, faFile, faHeart} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', './sidebar.component.css']
})
export class ProfileComponent implements OnInit {

  user!: User;
  tempUser!: User;
  verifiedPassword: string = "";
  confirmPassword: string = "";
  editMode: boolean = false;
  isVerified: boolean = false;
  username;

  profileIcon = faUser;
  cardIcon = faFile;
  historyIcon = faHeart;
  homeIcon = faHome;

  newUsername : string = "";
  newPassword : string = "";
  fname : string = "";
  lname : string = "";
  errorMessage: string = "";

  confirmPasswordMessage : string = "";
  usernameMessage : string = "";
  nameMessage : string = "";
  passwordMessage : string = "";

  emailSent: boolean = false;
  showMainForm: boolean = true;
  invalidEmail: boolean = false;


  constructor(private userService : UserService, 
              private emailService : EmailService,
              private router: Router) { 
    if(sessionStorage.getItem('userName')){
      this.username = sessionStorage.getItem('userName');
    }
    else
      this.errorMessage = "";
  }

  ngOnInit(): void {
    this.findUser();
  }


  findUser() {
    if(this.username) {
      this.userService.findByUserName(this.username).subscribe(
        (response : User) => {
          this.user = response;
        },
        (error : HttpErrorResponse) => {
          this.errorMessage = "";
        }
      )
    }
  }

  sendEmail(newUser : User){
    this.emailService.sendConfirmUser(newUser).subscribe(
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

  edit() {
    this.editMode = !this.editMode;
  }

  cancel(){
    this.editMode = false;
    this.isVerified = false;
    this.confirmPassword = "";
    this.confirmPasswordMessage = "";
    this.usernameMessage  = "";
    this.nameMessage  = "";
    this.passwordMessage = "";
  }
  
  verifyPassword(){
    var paramUser:User = {
      id: "",
      firstName: "",
      lastName: "",
      userName: this.user.userName,
      email: "",
      password: this.confirmPassword,
      status: "",
      isVerified: "",
      numberOfProjects: 0
    }
    this.userService.verifyPassword(paramUser).subscribe(
      (response : User) => {
        this.tempUser = response;
        this.verifiedPassword = this.confirmPassword;
        this.isVerified = true;
        console.log(this.verifiedPassword + "inside the subscribe");
      },
      (error : any) => {
        this.isVerified = false;
        this.errorMessage = "Password is incorrect!";
        this.confirmPasswordMessage = "Incorrect Password. Try Again.";
      }
    )
  }

  changeUsername(){
    if (this.newUsername !== ""){
      this.user.userName = this.newUsername;
      this.userService.updateUser(this.user).subscribe(
        (response : User) => {
          this.user = response;
          this.sendEmail(this.user);
        },
        (error : HttpErrorResponse) => {
          this.errorMessage = "Error: changeUsername()";
        }
      )
      this.usernameMessage = "Successfully updated!";
    }else
      this.usernameMessage = "Please Enter a Username.";
      
    this.newUsername = "";
  }

  changeName(){
    if (this.fname !== ""){
      this.changeFirstName();
      this.nameMessage = "Successfully updated!";
    }
    if(this.lname !== ""){
      this.changeLastName();
      this.nameMessage = "Successfully updated!";
    }
    if(this.fname === "" && this.lname === "")
      this.nameMessage = "Please enter a Name.";
    else
      this.sendEmail(this.user);

    this.fname = "";
    this.lname = "";
  }

  changeFirstName() {
    this.user.firstName = this.fname;
    this.userService.updateUser(this.user).subscribe(
      (response : User) => {
        this.user = response;
      },
      (error : HttpErrorResponse) => {
        this.errorMessage = "Error: changeFirstName()";
      }
      
    )
  }

  changeLastName() {
    this.user.lastName = this.lname;
    this.userService.updateUser(this.user).subscribe(
      (response : User) => {
        this.user = response;
      },
      (error : HttpErrorResponse) => {
        this.errorMessage = "Error: changeLastName()";
      }
      
    )
  }

  changePassword(){
    if (this.newPassword !== "") {
      this.user.password = this.newPassword;
      this.userService.updatePassword(this.user).subscribe(
        (response : User) => {
          this.user = response;
          this.sendEmail(this.user);
        },
        (error : HttpErrorResponse) => {
          this.errorMessage = "Error: changePassword()";
        }
        
      )
      this.passwordMessage = "Successfully updated!";
    }else
      this.passwordMessage = "Please enter a new Password.";
    this.newPassword = "";
  }

  exit() {
    this.router.navigate(['/projects']);
  }

}
