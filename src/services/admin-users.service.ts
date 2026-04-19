import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminUsersService {
  private apiUrl = `${environment.apiUrl}admin/users`;

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  deactivateUser(id: string): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/${id}/deactivate`, null);
  }

  activateUser(id: string): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/${id}/activate`, null);
  }

  deleteUser(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
