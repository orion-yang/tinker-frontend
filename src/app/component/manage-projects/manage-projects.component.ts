import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/app/models/admin/admin';
import { AdminService } from 'src/app/models/admin/admin.service';
import { LikedService } from 'src/app/models/liked/liked.service';
import { Project } from 'src/app/models/project/project';
import { ProjectService } from 'src/app/models/project/project.service';
import { faUser, faUsers, faUserTie, faSignOutAlt, faFile, faSearch } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/models/user/user.service';


@Component({
  selector: 'app-manage-projects',
  templateUrl: './manage-projects.component.html',
  styleUrls: ['./manage-projects.component.css', './sidebar.component.css']
})
export class ManageProjectsComponent implements OnInit {

  projects!: Project[];
  filteredProjects!: Project[];
  username;
  user!: User;
  admin!: Admin;
  search: string = "";
  filter: boolean = false;
  errorMessage: string = "";

  profileIcon = faUser;
  searchIcon = faSearch;
  fileIcon = faFile;
  usersIcon = faUsers;
  adminIcon = faUserTie;
  signoutIcon = faSignOutAlt;

  constructor(private projectService : ProjectService,
              private likedService : LikedService,
              private userService : UserService,
              private adminService : AdminService,
              private router: Router) {
                if(sessionStorage.getItem('userName')){
                  this.username = sessionStorage.getItem('userName');
                }
              }

  ngOnInit(): void {
    this.findAdmin();
    this.getAllProjects()
  }

  findAdmin() {
    if(this.username) {
      this.adminService.findByUserName(this.username).subscribe(
        (response : Admin) => {
          this.admin = response;
        },
        (error : HttpErrorResponse) => {
          this.errorMessage = "";
        }
      )
    }
  }

  getAllProjects() {
    this.projectService.getAllProjects().subscribe(
      (response : Project[]) => {
        this.projects = response;
        this.filteredProjects = this.projects;
      }
    )
  }

  filterOn() {
    this.filter = true;
  }

  filterOff() {
    this.filter = false;
  }

  checkFilter() {
    return this.filter;
  }

  searchForProject() {
    this.filteredProjects = this.projects.filter(
      project => project.project_name.toLowerCase().includes(this.search.toLowerCase()) ||
                 project.description.toLowerCase().includes(this.search.toLowerCase())
    );
    this.search = "";
  }

  decreaseProjectCount() {
    this.user.numberOfProjects -= 1;
    this.userService.updateUser(this.user).subscribe(
      (response : User) => {
        this.user = response;
      }
    );
  }

  deleteProject(project : Project) {
    this.user = project.user;
    this.likedService.deleteLikedByProject(project.id).subscribe(
      (response: void) => {
        this.decreaseProjectCount();
        this.projectService.deleteProject(project.id).subscribe(
          (response : void) => {
            this.getAllProjects();
          },
          (error : HttpErrorResponse) => {
            this.errorMessage = "Error: deleteProject()";
          }
        );        
      },
      (error : HttpErrorResponse) => {
        this.errorMessage = "Error: deleteProject()";
      }
    );
  }

  signOut() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

}
