import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { PagedRequestDto } from '../models/paged-request-dto';
import { PagedResponseDto } from '../models/paged-response-dto';
import { ProductDto } from '../models/product-dto';
import { CreateProductDto } from '../models/create-product-dto';
import { UpdateProductDto } from '../models/update-product-dto';

@Injectable({
  providedIn: 'root'
})
export class SellerProductsService {
  private apiUrl = `${environment.apiUrl}/api/seller/products`;

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

  getProducts(request: PagedRequestDto): Observable<PagedResponseDto<ProductDto>> {
    return this.http.get<PagedResponseDto<ProductDto>>(this.apiUrl, { params: this.buildParams(request) });
  }

  createProduct(data: CreateProductDto): Observable<ProductDto> {
    return this.http.post<ProductDto>(this.apiUrl, data);
  }

  updateProduct(id: number, data: UpdateProductDto): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/${id}`, data);
  }

  deleteProduct(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }

  updateStock(id: number, quantity: number): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/${id}/stock`, quantity);
  }
}
