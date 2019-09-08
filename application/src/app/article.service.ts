import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private _articlesUrl = "http://localhost:3000/api/articles";
  constructor(private http: HttpClient) { }

  getEvents() {
    return this.http.get<any>(this._articlesUrl)
  }
}
