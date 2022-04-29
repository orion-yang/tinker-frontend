import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/models/user/user.service';
import { faUser, faDoorOpen, faFile, faHeart} from '@fortawesome/free-solid-svg-icons';
import { LikedService } from 'src/app/models/liked/liked.service';
import { Liked } from 'src/app/models/liked/liked';
import { Project } from 'src/app/models/project/project';


@Component({
  selector: 'app-liked-projects',
  templateUrl: './liked-projects.component.html',
  styleUrls: ['./liked-projects.component.css', './sidebar.component.css']
})
export class LikedProjectsComponent implements OnInit {

  user! : User;
  userId;

  profileIcon = faUser;
  fileIcon = faFile;
  heartIcon = faHeart;
  exitIcon = faDoorOpen;

  errorMessage: string = "";
  message: string = "";
  likedProjects!: Liked[];
  selectedLikedProject!: Liked;



  constructor(private userService: UserService,
              private likedService : LikedService,
              private router: Router) {
                this.userId = sessionStorage.getItem('id')? sessionStorage.getItem('id') : "";
              }

  ngOnInit(): void {
    this.findUser();
    this.getLikedProjects();
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

  getLikedProjects() {
    if (this.userId) {
      this.likedService.findAllByUserId(this.userId).subscribe(
        (response: Liked[]) => {
          this.likedProjects = response;
        }
      )      
    }
  }

  viewInfo(liked: Liked){
    this.selectedLikedProject = liked;
  }

  exit() {
    this.router.navigate(['projects']);
  }


}
