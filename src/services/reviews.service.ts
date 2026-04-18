import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { CreateReviewDto } from '../models/create-review-dto';
import { ReviewDto } from '../models/review-dto';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private apiUrl = `${environment.apiUrl}/api/reviews`;

  constructor(private http: HttpClient) {}

  createReview(data: CreateReviewDto): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl, data);
  }

  getProductReviews(productId: number): Observable<ReviewDto[]> {
    return this.http.get<ReviewDto[]>(`${this.apiUrl}/${productId}`);
  }

  deleteReview(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
