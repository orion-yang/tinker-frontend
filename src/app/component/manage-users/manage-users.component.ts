import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, GridApi } from 'ag-grid-community';
import { Admin } from 'src/app/models/admin/admin';
import { AdminService } from 'src/app/models/admin/admin.service';
import { EmailService } from 'src/app/models/email/email.service';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/models/user/user.service';
import { faUser, faFilm, faTag, faUsers, faCalendarPlus, faUserTie, faSignOutAlt, faFile} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css', './sidebar.component.css']
})
export class ManageUsersComponent implements OnInit {

  admin!: Admin;
  users!: User[];
  userName;
  selectedUser!: User;
  errorMessage: string = "";

  profileIcon = faUser;
  fileIcon = faFile;
  usersIcon = faUsers;
  adminIcon = faUserTie;
  signoutIcon = faSignOutAlt;

  constructor(private adminService: AdminService,
              private userService: UserService,
              private emailService: EmailService,
              private router: Router) { 
                if(sessionStorage.getItem('userName')) {
                  this.userName = sessionStorage.getItem('userName');
                }
              }

  ngOnInit(): void {
    this.findAdmin();
    this.getUsers();
  }

  findAdmin() {
    if(this.userName) {
      this.adminService.findByUserName(this.userName).subscribe(
        (response : Admin) => {
          this.admin = response;
          console.log(response);
        },
        (error : HttpErrorResponse) => {
          this.errorMessage = "error finding admin";
        }
      )
    }
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      (response : User[]) => {
        this.users = response;
      },
      (error : HttpErrorResponse) => {
        this.errorMessage = "error getting users";
      }
    )
  }

  selectionChanged({ api }: {api: GridApi}): void {
    const selection = api.getSelectedRows();
    if (selection.length === 0) {
      return;
    }
    this.selectedUser = selection[0];
  }

  viewInfo(user: User){
    this.selectedUser = user;
  }

  suspend() {
    this.selectedUser.status = 'Inactive'
    this.userService.updateUser(this.selectedUser).subscribe(
      (response : User) => {
        this.selectedUser = response;
        this.getUsers();
      },
      (error : HttpErrorResponse) => {
        this.errorMessage = "Error: Couldn't change Status";
      }
    )
  }

  unSuspend() {
    this.selectedUser.status = 'Active'
    this.userService.updateUser(this.selectedUser).subscribe(
      (response : User) => {
        this.selectedUser = response;
        this.getUsers();
      },
      (error : HttpErrorResponse) => {
        this.errorMessage = "Error: Couldn't change Status";
      }
    )
  }
  
  signOut() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

}
