import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { RegisterDto } from '../models/register-dto';
import { LoginDto } from '../models/login-dto';
import { AuthResponseDto } from '../models/auth-response-dto';
import { RevokeTokenDto } from '../models/revoke-token-dto';
import { ForgotPasswordDto } from '../models/forgot-password-dto';
import { ResetPasswordDto } from '../models/reset-password-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/api/auth`;

  constructor(private http: HttpClient) {}

  register(data: RegisterDto): Observable<AuthResponseDto> {
    return this.http.post<AuthResponseDto>(`${this.apiUrl}/register`, data);
  }

  login(data: LoginDto): Observable<AuthResponseDto> {
    return this.http.post<AuthResponseDto>(`${this.apiUrl}/login`, data);
  }

  refreshToken(data: RevokeTokenDto): Observable<AuthResponseDto> {
    return this.http.post<AuthResponseDto>(`${this.apiUrl}/refresh-token`, data);
  }

  revokeToken(data: RevokeTokenDto): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/revoke-token`, data);
  }

  forgotPassword(data: ForgotPasswordDto): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/forgot-password`, data);
  }

  resetPassword(data: ResetPasswordDto): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/reset-password`, data);
  }

  confirmEmail(userId: string, token: string): Observable<boolean> {
    let params = new HttpParams().set('userId', userId).set('token', token);
    return this.http.post<boolean>(`${this.apiUrl}/confirm-email`, null, { params });
  }
}
