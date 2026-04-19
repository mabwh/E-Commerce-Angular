import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { UpdateUserProfileDto } from '../models/update-user-profile-dto';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = `${environment.apiUrl}users`;

  constructor(private http: HttpClient) {}

  getProfile(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profile`);
  }

  updateProfile(data: UpdateUserProfileDto): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/profile`, data);
  }

  getOrders(): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/orders`);
  }

  deleteMe(): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/me`);
  }
}
