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
export class ProductsService {
  private apiUrl = `${environment.apiUrl}/api/products`;

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

  searchProducts(name: string, request: PagedRequestDto): Observable<PagedResponseDto<ProductDto>> {
    let params = this.buildParams(request).set('name', name);
    return this.http.get<PagedResponseDto<ProductDto>>(`${this.apiUrl}/search`, { params });
  }

  filterProducts(categoryId: number, minPrice: number, maxPrice: number, request: PagedRequestDto): Observable<PagedResponseDto<ProductDto>> {
    let params = this.buildParams(request)
      .set('categoryId', categoryId.toString())
      .set('minPrice', minPrice.toString())
      .set('maxPrice', maxPrice.toString());
    return this.http.get<PagedResponseDto<ProductDto>>(`${this.apiUrl}/filter`, { params });
  }

  getProductById(id: number): Observable<ProductDto> {
    return this.http.get<ProductDto>(`${this.apiUrl}/${id}`);
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
}
