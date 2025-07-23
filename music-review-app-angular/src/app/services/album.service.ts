import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Album {
  _id: string;
  title: string;
  artist: string;
  genre: string;
  releaseDate: string;
  coverImage: string;
}

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private baseUrl = 'http://localhost:5100/api'; // or your deployed URL

  constructor(private http: HttpClient) {}

  getAlbumById(id: string) {
    return this.http.get<Album>(`${this.baseUrl}/albums/${id}`);
  }

  getAlbums(): Observable<any> {
    return this.http.get(`${this.baseUrl}/albums`);
  }

  importAlbum(albumName: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/albums/import`, { name: albumName });
  }
}