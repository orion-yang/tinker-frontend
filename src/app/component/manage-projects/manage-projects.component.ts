import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/app/models/admin/admin';
import { AdminService } from 'src/app/models/admin/admin.service';
import { LikedService } from 'src/app/models/liked/liked.service';
import { Project } from 'src/app/models/project/project';
import { ProjectService } from 'src/app/models/project/project.service';
import { faUser, faFilm, faTag, faUsers, faCalendarPlus, faUserTie, faSignOutAlt, faFile, faHeart, faHome } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-manage-projects',
  templateUrl: './manage-projects.component.html',
  styleUrls: ['./manage-projects.component.css', './sidebar.component.css']
})
export class ManageProjectsComponent implements OnInit {

  projects!: Project[];
  username;
  admin!: Admin;
  errorMessage: string = "";

  profileIcon = faUser;
  fileIcon = faFile;
  usersIcon = faUsers;
  adminIcon = faUserTie;
  signoutIcon = faSignOutAlt;

  constructor(private projectService : ProjectService,
              private likedService : LikedService,
              private adminService : AdminService,
              private router: Router) {
                if(localStorage.getItem('userName')){
                  this.username = localStorage.getItem('userName');
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
          console.log(response);
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
        if (response.length > 0) {
          this.projects = response;
        }
      }
    )
  }

  deleteProject(project : Project){
    this.likedService.deleteLikedByProject(project.id).subscribe(
      (response: void) => {
        console.log(response + "Deleted liked");
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
