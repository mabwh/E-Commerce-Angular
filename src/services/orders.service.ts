import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { PlaceOrderDto } from '../models/place-order-dto';
import { OrderDto } from '../models/order-dto';
import { UserOrderDto } from '../models/user-order-dto';
import { PagedRequestDto } from '../models/paged-request-dto';
import { PagedResponseDto } from '../models/paged-response-dto';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiUrl = `${environment.apiUrl}Orders`;

  constructor(private http: HttpClient) {}

  private buildParams(request?: any): HttpParams {
    let params = new HttpParams();
    if (request) {
      Object.keys(request).forEach(key => {
        if (request[key] !== undefined && request[key] !== null) {
          params = params.set(key, request[key].toString());
        }
      });
    }
    return params;
  }

  placeOrder(data: PlaceOrderDto): Observable<OrderDto> {
    return this.http.post<OrderDto>(this.apiUrl, data);
  }

  getOrders(request: PagedRequestDto): Observable<PagedResponseDto<OrderDto>> {
    return this.http.get<PagedResponseDto<OrderDto>>(this.apiUrl, { params: this.buildParams(request) });
  }

  getUserOrders(): Observable<PagedResponseDto<UserOrderDto>> {
    return this.http.get<PagedResponseDto<UserOrderDto>>(`${environment.apiUrl}users/orders`);
  }

  getOrderById(id: number): Observable<OrderDto> {
    return this.http.get<OrderDto>(`${this.apiUrl}/${id}`);
  }

  cancelOrder(id: number): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/${id}/cancel`, null);
  }
}
