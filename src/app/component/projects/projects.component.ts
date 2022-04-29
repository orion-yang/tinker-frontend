import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project/project';
import { ProjectService } from 'src/app/models/project/project.service';
import { User } from 'src/app/models/user/user';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  project_name: string;
  create_date: string;
  like_counter: number;
  description: string;
  userId;

  likedProjects!: Project[];
  projects!: Project[];
  currentProject!: Project;
  userLiked: boolean = false;
  count: number = 0;


  constructor(private projectService: ProjectService) {
    this.project_name = 'Title';
    this.create_date = "00/00/00";
    this.like_counter = 0;
    this.description = "NONE"
    this.userId = sessionStorage.getItem('id') ? sessionStorage.getItem('id') : "";

   }

  ngOnInit(): void {
    this.initializeCurrentProject();
    console.log(this.currentProject);
    this.getAllProjects();
  }

  //For Testing purposes
  initializeCurrentProject() {
    var tempUser : User  = {
      id: "",
      firstName: "",
      lastName: "",
      userName: "",
      email: "", 
      password: "",
      status: "",
      numberOfProjects: 0,
      isVerified: "",
  }
    
    var temp : Project = {
      id: "",
      project_name: this.project_name,
      create_date: this.create_date,
      like_counter: this.like_counter,
      description: this.description,
      user: tempUser,
    }

    this.currentProject = temp;
  }

  getAllProjects() {
    this.projectService.getAllProjects().subscribe(
      (response : Project[]) => {
        if (response.length > 0) {
          this.projects = response;
          this.currentProject = this.projects[this.count];
        }
      }
    )
  }

  nextProject() {
    if (this.count == this.projects.length - 1) {
      this.count = 0;
    } else {
      this.count++;
    }
    this.userLiked = false;
    this.currentProject = this.projects[this.count];

  }

  previousProject() {
    if (this.count == 0) {
      this.count = this.projects.length - 1;
    } else {
      this.count--;
    }
    this.userLiked = false;
    this.currentProject = this.projects[this.count];
  }

  likeProject() {
    //might have to checked liked table
    //imp: if not in likedProjects then continue
    if (!this.userLiked) {
      this.currentProject.like_counter = this.currentProject.like_counter + 1;
      this.projectService.updateProject(this.currentProject);
      this.userLiked = true;
    }
    
    //also implement add liked class/database
  }

  goToProfile() {

  }

  signOut() {

  }

}
