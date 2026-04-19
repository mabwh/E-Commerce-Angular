import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { PagedRequestDto } from '../models/paged-request-dto';
import { PagedResponseDto } from '../models/paged-response-dto';
import { CategoryDto } from '../models/category-dto';
import { CreateCategoryDto } from '../models/create-category-dto';
import { UpdateCategoryDto } from '../models/update-category-dto';
import { ProductDto } from '../models/product-dto';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private apiUrl = `${environment.apiUrl}Categories`;

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

  getCategories(request: PagedRequestDto): Observable<PagedResponseDto<CategoryDto>> {
    return this.http.get<PagedResponseDto<CategoryDto>>(this.apiUrl, { params: this.buildParams(request) });
  }

  getCategoryById(id: number): Observable<CategoryDto> {
    return this.http.get<CategoryDto>(`${this.apiUrl}/${id}`);
  }

  getCategoryProducts(id: number, request: PagedRequestDto): Observable<PagedResponseDto<ProductDto>> {
    return this.http.get<PagedResponseDto<ProductDto>>(`${this.apiUrl}/${id}/products`, { params: this.buildParams(request) });
  }

  createCategory(data: CreateCategoryDto): Observable<CategoryDto> {
    return this.http.post<CategoryDto>(this.apiUrl, data);
  }

  updateCategory(id: number, data: UpdateCategoryDto): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/${id}`, data);
  }

  deleteCategory(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
