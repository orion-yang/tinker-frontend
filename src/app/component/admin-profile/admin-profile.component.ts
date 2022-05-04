import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUser, faFilm, faTag, faUsers, faCalendarPlus, faUserTie, faSignOutAlt, faFile, faHeart, faHome } from '@fortawesome/free-solid-svg-icons';
import { Admin } from 'src/app/models/admin/admin';
import { AdminService } from 'src/app/models/admin/admin.service';
import { EmailResponse } from 'src/app/models/email/email';
import { EmailService } from 'src/app/models/email/email.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css', './sidebar.component.css']
})
export class AdminProfileComponent implements OnInit {

  admin!: Admin;
  tempAdmin!: Admin;
  verifiedPassword: string = "";
  confirmPassword: string = "";
  editMode: boolean = false;
  isVerified: boolean = false;
  username;

  profileIcon = faUser;
  fileIcon = faFile;
  usersIcon = faUsers;
  adminIcon = faUserTie;
  signoutIcon = faSignOutAlt;
  
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


  constructor(private adminService : AdminService,
              private emailService : EmailService,
              private router: Router) { 
    if(sessionStorage.getItem('userName')){
      this.username = sessionStorage.getItem('userName');
    }
  }

  ngOnInit(): void {
    this.findAdmin();
  }


  findAdmin() {
    if(this.username) {
      this.adminService.findByUserName(this.username).subscribe(
        (response : Admin) => {
          this.admin = response;
          console.log(response);
        },
        (error : HttpErrorResponse) => {
          this.errorMessage = "";
        }
      )
    }
  }

  sendEmail(newAdmin : Admin){
    this.emailService.sendConfirmAdmin(newAdmin).subscribe(
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
    var paramAdmin:Admin = {
      id: "",
      firstName: "",
      lastName: "",
      userName: this.admin.userName,
      email: "",
      password: this.confirmPassword
    }
    this.adminService.verifyPassword(paramAdmin).subscribe(
      (response : Admin) => {
        this.tempAdmin = response;
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
      this.admin.userName = this.newUsername;
      this.adminService.updateAdmin(this.admin).subscribe(
        (response : Admin) => {
          this.admin = response;
          this.sendEmail(this.admin);
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
      this.sendEmail(this.admin);

    this.fname = "";
    this.lname = "";
  }

  changeFirstName() {
    this.admin.firstName = this.fname;
    this.adminService.updateAdmin(this.admin).subscribe(
      (response : Admin) => {
        this.admin = response;
      },
      (error : HttpErrorResponse) => {
        this.errorMessage = "Error: changeFirstName()";
      }
      
    )
  }

  changeLastName() {
    this.admin.lastName = this.lname;
    this.adminService.updateAdmin(this.admin).subscribe(
      (response : Admin) => {
        this.admin = response;
      },
      (error : HttpErrorResponse) => {
        this.errorMessage = "Error: changeLastName()";
      }
      
    )
  }

  changePassword(){
    if (this.newPassword !== ""){
      this.admin.password = this.newPassword;
      this.adminService.updatePassword(this.admin).subscribe(
        (response : Admin) => {
          this.admin = response;
          this.sendEmail(this.admin);
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

  signOut() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

}
