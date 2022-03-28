import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from '../admin/admin';
import { User } from '../user/user';
import { EmailResponse } from './email';
import { VerificationToken } from './verification-token';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  baseUrl = 'http://localhost:8080/email';

  constructor(private http: HttpClient) { }

  public sendResetPassword(verificationToken: VerificationToken): Observable<EmailResponse> {
    console.log(verificationToken);
    return this.http.post<EmailResponse>(`${this.baseUrl}/send/reset-password`, verificationToken);
  }

  public sendVerifyUser(verificationToken: VerificationToken): Observable<EmailResponse> {
    console.log(verificationToken);
    return this.http.post<EmailResponse>(`${this.baseUrl}/send/verify-user`, verificationToken);
  }

  public sendConfirmationOrder(verificationToken: VerificationToken): Observable<EmailResponse> {
    console.log(verificationToken);
    return this.http.post<EmailResponse>(`${this.baseUrl}/send/order-confirmation`, verificationToken);
  }

  public sendConfirmUser(user : User): Observable<EmailResponse> {
    return this.http.post<EmailResponse>(`${this.baseUrl}/send/confirm-user`, user);
  }

  public sendConfirmAdmin(admin : Admin): Observable<EmailResponse> {
    return this.http.post<EmailResponse>(`${this.baseUrl}/send/confirm-admin`, admin);
  }

  public sendAdminInfo(admin : Admin): Observable<EmailResponse> {
    return this.http.post<EmailResponse>(`${this.baseUrl}/send/admin`, admin);
  }


}
