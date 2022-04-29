import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project/project';
import { ProjectService } from 'src/app/models/project/project.service';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/models/user/user.service';
import { faUser, faDoorOpen, faFile, faHeart} from '@fortawesome/free-solid-svg-icons';
import { DatePipe } from '@angular/common';
import { LikedService } from 'src/app/models/liked/liked.service';


@Component({
  selector: 'app-user-projects',
  templateUrl: './user-projects.component.html',
  styleUrls: ['./user-projects.component.css', './sidebar.component.css']
})
export class UserProjectsComponent implements OnInit {

  user! : User;
  project! : Project;
  fname: string = "";
  project_name: string = "";
  create_date: any = "";
  like_counter: number = 0;
  description: string = "";
  userId;
  projects!: Project[];

  profileIcon = faUser;
  fileIcon = faFile;
  heartIcon = faHeart;
  exitIcon = faDoorOpen;

  errorMessage: string = "";
  message: string = "";

  constructor(private userService : UserService,
              private projectService : ProjectService,
              private likedService : LikedService,
              private router: Router,
              private datePipe: DatePipe) {
    this.userId = sessionStorage.getItem('id')? sessionStorage.getItem('id') : "";
    this.create_date = this.datePipe.transform((new Date()), 'MM/dd/yyyy');
    console.log(this.create_date);
  }

  ngOnInit(): void {
    this.findUser();
    this.getProjectsById();
  }

  findUser() {
    if(this.userId) {
      this.userService.findById(this.userId).subscribe(
        (response : User) => {
          this.user = response;
        },
        (error : HttpErrorResponse) => {
          this.errorMessage = "";
        }
      )
    }
  }

  getProjectsById() {
    this.projectService.findByUserId(this.userId).subscribe(
      (response : Project[]) => {
        this.projects = response;
      }
    )
  }
  
  addProject() {
  if(this.project_name && this.description){ //do check
    var newProject: Project = {
      id: '',
      project_name: this.project_name,
      create_date: this.create_date,
      like_counter: 0,
      description: this.description,
      user: this.user
    }

      this.projectService.addProject(newProject).subscribe(
        (response : Project) => {
          this.project = response;
          this.getProjectsById();
        },
        (error : HttpErrorResponse) => {
          this.errorMessage = "Error: addProject()";
        }
      );
      this.message = "Project successfully added.";
  }
  else {
    this.message = "Form was not filled correctly. Unable to add Project.";
  }
  // reset project form
  this.project_name = "";
  this.description = "";

  }

  deleteProject(project : Project){
    this.likedService.deleteLikedByProject(project.id).subscribe(
      (response: void) => {
        console.log(response + "Deleted liked");
        this.projectService.deleteProject(project.id).subscribe(
          (response : void) => {
            this.getProjectsById();
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

  exit() {
    this.router.navigate(['/projects']);
  }

}
