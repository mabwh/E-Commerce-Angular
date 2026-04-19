import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { CreateProductDto } from '../models/create-product-dto';
import { UpdateProductDto } from '../models/update-product-dto';

@Injectable({
  providedIn: 'root'
})
export class AdminProductsService {
  private apiUrl = `${environment.apiUrl}admin/products`;

  constructor(private http: HttpClient) {}

  createProduct(data: CreateProductDto): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  updateProduct(id: number, data: UpdateProductDto): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/${id}`, data);
  }

  deleteProduct(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }

  updateStock(id: number, quantity: number): Observable<boolean> {
    let params = new HttpParams().set('quantity', quantity.toString());
    return this.http.put<boolean>(`${this.apiUrl}/${id}/stock`, null, { params });
  }
}
