import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from './admin';

@Injectable({
  providedIn: 'root'
})

export class AdminService {
  private adminServiceUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public getAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(`${this.adminServiceUrl}/admin/all`);
  }

  public addAdmin(admin: Admin): Observable<Admin> {
    return this.http.post<Admin>(`${this.adminServiceUrl}/admin/add`, admin);
  }

  public updateAdmin(admin: Admin): Observable<Admin> {
    return this.http.put<Admin>(`${this.adminServiceUrl}/admin/update`, admin);
  }

  public deleteAdmin(adminId: number): Observable<void> {
    return this.http.delete<void>(`${this.adminServiceUrl}/admin/delete/${adminId}`);
  }

  public findByUserName(username : string): Observable<Admin> {
    return this.http.get<Admin>(`${this.adminServiceUrl}/admin/search/${username}`);
  }

  public verifyPassword(admin: Admin):Observable<Admin> {
    return this.http.post<Admin>(`${this.adminServiceUrl}/admin/verify-password`,admin);
  }

  public adminLogin(admin: Admin): Observable<Admin> {
    return this.http.post<Admin>(`${this.adminServiceUrl}/admin/login`, admin);
  }

  public findByEmail(email : string): Observable<Admin> {
    return this.http.get<Admin>(`${this.adminServiceUrl}/admin/search/email/${email}`)
  } 

  public updatePassword(admin: Admin): Observable<Admin> {
    return this.http.put<Admin>(`${this.adminServiceUrl}/admin/update/password`, admin)
  }


}

