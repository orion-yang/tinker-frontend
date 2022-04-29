import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Liked } from './liked';

@Injectable({
  providedIn: 'root'
})
export class LikedService {

  private likedServiceUrl = 'http://localhost:8080/liked';

  constructor(private http: HttpClient) { }

  public findAll(): Observable<Liked[]> {
    return this.http.get<Liked[]>(`${this.likedServiceUrl}/all`);
  }

  public findAllByUserId(userId:any): Observable<Liked[]> {
    return this.http.get<Liked[]>(`${this.likedServiceUrl}/find/user/${userId}`);
  }

  public findAllByProjectId(projectId:any): Observable<Liked[]> {
    return this.http.get<Liked[]>(`${this.likedServiceUrl}/find/project/${projectId}`);
  }

  public addLiked(liked: Liked): Observable<Liked> {
    return this.http.post<Liked>(`${this.likedServiceUrl}/add`, liked);
  }

  public deleteLiked(id:string):Observable<void>{
    return this.http.delete<void>(`${this.likedServiceUrl}/delete/${id}`);
  }

  public deleteLikedByProject(project_id:string):Observable<void>{
    console.log(project_id);
    return this.http.delete<void>(`${this.likedServiceUrl}/delete-by-project/${project_id}`);
  }

}
