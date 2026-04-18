import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { PagedRequestDto } from '../models/paged-request-dto';
import { PagedResponseDto } from '../models/paged-response-dto';
import { OrderDto } from '../models/order-dto';

@Injectable({
  providedIn: 'root'
})
export class AdminOrdersService {
  private apiUrl = `${environment.apiUrl}/api/admin/orders`;

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

  getOrders(request: PagedRequestDto): Observable<PagedResponseDto<OrderDto>> {
    return this.http.get<PagedResponseDto<OrderDto>>(this.apiUrl, { params: this.buildParams(request) });
  }

  getOrderById(id: number): Observable<OrderDto> {
    return this.http.get<OrderDto>(`${this.apiUrl}/${id}`);
  }

  updateOrderStatus(id: number, status: string): Observable<boolean> {
    let params = new HttpParams().set('status', status);
    return this.http.put<boolean>(`${this.apiUrl}/${id}/status`, null, { params });
  }
}
