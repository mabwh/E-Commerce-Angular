import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { WishlistDto } from '../models/wishlist-dto';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private apiUrl = `${environment.apiUrl}wishlist`;

  constructor(private http: HttpClient) {}

  getWishlist(): Observable<WishlistDto[]> {
    return this.http.get<WishlistDto[]>(this.apiUrl);
  }

  addToWishlist(productId: number): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/${productId}`, null);
  }

  removeFromWishlist(productId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${productId}`);
  }
}
