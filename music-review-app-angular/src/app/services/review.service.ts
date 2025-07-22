// src/app/services/review.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Review {
  _id?: string;
  albumId: string;
  userId: string;
  rating: number;
  comment: string;
  date?: string;
  user?: {
    name: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'http://localhost:5100/api/reviews';

  constructor(private http: HttpClient) {}

  getReviewsByAlbum(albumId: string) {
    return this.http.get<Review[]>(`${this.apiUrl}/album/${albumId}`);
  }

  getReviewsByUser(userId: string): Observable<Review[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
  }
  submitReview(review: Review): Observable<Review> {
    return this.http.post<Review>(this.apiUrl, review);
  }
  createReview(review: Review) {
    return this.http.post(`${this.apiUrl}`, review);
  }
}