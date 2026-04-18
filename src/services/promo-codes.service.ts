import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { PagedRequestDto } from '../models/paged-request-dto';
import { PagedResponseDto } from '../models/paged-response-dto';
import { PromoCodeDto } from '../models/promo-code-dto';
import { CreatePromoCodeDto } from '../models/create-promo-code-dto';
import { UpdatePromoCodeDto } from '../models/update-promo-code-dto';

@Injectable({
  providedIn: 'root'
})
export class PromoCodesService {
  private apiUrl = `${environment.apiUrl}/api/admin/promocodes`;

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

  getPromoCodes(request: PagedRequestDto): Observable<PagedResponseDto<PromoCodeDto>> {
    return this.http.get<PagedResponseDto<PromoCodeDto>>(this.apiUrl, { params: this.buildParams(request) });
  }

  createPromoCode(data: CreatePromoCodeDto): Observable<PromoCodeDto> {
    return this.http.post<PromoCodeDto>(this.apiUrl, data);
  }

  updatePromoCode(id: number, data: UpdatePromoCodeDto): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/${id}`, data);
  }

  deletePromoCode(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
