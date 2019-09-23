import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private _articlesUrl = "http://localhost:3000/api/articles";
  private _onlyMyArticlesUrl = "http://localhost:3000/api/myarticles";
  private _deleteUrl = "http://localhost:3000/api/delete";

  constructor(private http: HttpClient) { }

  getEvents() {
    return this.http.get<any>(this._articlesUrl)
  }

  getMyArticles() {
    return this.http.get<any>(this._onlyMyArticlesUrl)
  }

  deleteArticle(id) {
    console.log("to be dleted "+id);
    return this.http.delete<any>(this._deleteUrl+'/'+id);
  }
}
