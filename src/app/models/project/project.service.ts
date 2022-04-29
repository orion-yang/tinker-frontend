import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from './project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projectServiceUrl = 'http://localhost:8080/project';

  constructor(private http: HttpClient) { }

  public getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.projectServiceUrl}/all`);
  }
  
  public findByUserId(userId:any): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.projectServiceUrl}/find/${userId}`);
  }

  public addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.projectServiceUrl}/add`, project);
  }

  public deleteProject(id:string):Observable<void>{
    return this.http.delete<void>(`${this.projectServiceUrl}/delete/${id}`);
  }

  public updateProject(project: Project):Observable<Project> {
    return this.http.put<Project>(`${this.projectServiceUrl}/update`, project);
  }


}
