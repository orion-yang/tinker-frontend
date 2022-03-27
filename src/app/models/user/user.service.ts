import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private userServiceUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.userServiceUrl}/user/all`);
  }

  public addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.userServiceUrl}/user/add`, user);
  }

  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.userServiceUrl}/user/update`, user);
  }

  public deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.userServiceUrl}/user/delete/${userId}`);
  }

  public findByUserName(username : string): Observable<User> {
    return this.http.get<User>(`${this.userServiceUrl}/user/search/${username}`);
  }

  public findById(userId : string): Observable<User> {
    return this.http.get<User>(`${this.userServiceUrl}/user/find/${userId}`);
  }

  public userLogin(user: User): Observable<User> {
    return this.http.post<User>(`${this.userServiceUrl}/user/login`, user);
  }

  public verifyPassword(user : User):Observable<User> {
    return this.http.post<User>(`${this.userServiceUrl}/user/verify-password`,user);
  }
  
  public findByEmail(email : string): Observable<User> {
    return this.http.get<User>(`${this.userServiceUrl}/user/search/email/${email}`)
  }

  public updatePassword(user : User): Observable<User> {
    return this.http.put<User>(`${this.userServiceUrl}/user/update/password`, user)
  }



}
