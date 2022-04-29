import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Liked } from 'src/app/models/liked/liked';
import { LikedService } from 'src/app/models/liked/liked.service';
import { Project } from 'src/app/models/project/project';
import { ProjectService } from 'src/app/models/project/project.service';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/models/user/user.service';

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
  username;
  userId;

  unlikedProject!: Liked;
  user!: User;
  liked!: Liked;
  likedProjects!: Liked[];
  projects!: Project[];
  currentProject!: Project;
  userLiked: boolean = false;
  count: number = 0;


  constructor(private projectService: ProjectService,
              private likedService: LikedService,
              private userService: UserService,
              private router: Router) {
    this.project_name = 'Title';
    this.create_date = "00/00/00";
    this.like_counter = 0;
    this.description = "NONE"
    this.userId = sessionStorage.getItem('id') ? sessionStorage.getItem('id') : "";
    this.username = sessionStorage.getItem('userName') ? sessionStorage.getItem('userName') : "";
   }

  ngOnInit(): void {
    this.initializeCurrentProject();
    this.getAllProjects();
    this.findUser()
    this.getLikedProjects();
  }

  findUser() {
    if(this.username) {
      this.userService.findByUserName(this.username).subscribe(
        (response : User) => {
          this.user = response;
        },
        (error : HttpErrorResponse) => {
          console.log(error);
        }
      )
    }
  }

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

  getLikedProjects() {
    if (this.userId) {
      this.likedService.findAllByUserId(this.userId).subscribe(
        (response: Liked[]) => {
          this.likedProjects = response;
        }
      )      
    }
  }

  unlikeProject() {
    this.userLiked = false;

    if (this.likedProjects) {
      for (let i = 0; i < this.likedProjects.length; i++) {
        if (this.currentProject.id == this.likedProjects[i].project.id) {
          this.likedService.deleteLiked(this.likedProjects[i].id).subscribe(
            (response : void) => {
              this.getLikedProjects();
            }
          )
          this.userLiked = true;
          break;
        }
      }      
    }

    if (this.userLiked) {
      this.currentProject.like_counter = this.currentProject.like_counter - 1;
      this.projectService.updateProject(this.currentProject).subscribe(
        (response : Project) => {
          this.getAllProjects();
        }
      )
      this.userLiked = false;
    }
    this.nextProject();
  }

  likeProject() {

    if (this.likedProjects) {
      for (let i = 0; i < this.likedProjects.length; i++) {
        if (this.currentProject.id == this.likedProjects[i].project.id) {
          this.userLiked = true;
          break;
        }
      }      
    }

    if (!this.userLiked) {
      this.currentProject.like_counter = this.currentProject.like_counter + 1;
      this.projectService.updateProject(this.currentProject).subscribe(
        (response : Project) => {
          this.getAllProjects();
        }
      )

      if (this.user && this.currentProject) {
        var newLiked : Liked = {
          id: '',
          user: this.user,
          project: this.currentProject
        }


        this.likedService.addLiked(newLiked).subscribe(
          (response: Liked) => {
            this.liked = response;
            this.getLikedProjects();
          }
        )      
      }        

      this.userLiked = true;
    }
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  signOut() {
    this.router.navigate(['']);
    sessionStorage.clear();
    this.deleteAllCookies()
  }

  deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

}
