import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { CartDto } from '../models/cart-dto';
import { AddToCartDto } from '../models/add-to-cart-dto';
import { UpdateCartItemDto } from '../models/update-cart-item-dto';
import { CheckoutSummaryDto } from '../models/checkout-summary-dto';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = `${environment.apiUrl}/api/cart`;

  constructor(private http: HttpClient) {}

  private getOptions(guestSessionId?: string) {
    let headers = new HttpHeaders();
    if (guestSessionId) {
      headers = headers.set('X-Guest-Session-Id', guestSessionId);
    }
    return { headers };
  }

  getCart(guestSessionId?: string): Observable<CartDto> {
    return this.http.get<CartDto>(this.apiUrl, this.getOptions(guestSessionId));
  }

  addToCart(data: AddToCartDto): Observable<CartDto> {
    return this.http.post<CartDto>(`${this.apiUrl}/items`, data);
  }

  updateCartItem(productId: number, data: UpdateCartItemDto): Observable<CartDto> {
    return this.http.put<CartDto>(`${this.apiUrl}/items/${productId}`, data);
  }

  removeCartItem(productId: number): Observable<CartDto> {
    return this.http.delete<CartDto>(`${this.apiUrl}/items/${productId}`);
  }

  clearCart(guestSessionId?: string): Observable<CartDto> {
    return this.http.delete<CartDto>(`${this.apiUrl}/clear`, this.getOptions(guestSessionId));
  }

  applyPromoCode(code: string): Observable<CartDto> {
    let params = new HttpParams().set('code', code);
    return this.http.post<CartDto>(`${this.apiUrl}/apply-promo`, null, { params });
  }

  getCheckoutSummary(guestSessionId?: string): Observable<CheckoutSummaryDto> {
    return this.http.get<CheckoutSummaryDto>(`${this.apiUrl}/checkout-summary`, this.getOptions(guestSessionId));
  }
}
