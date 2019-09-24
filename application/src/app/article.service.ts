import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private _articlesUrl = "http://localhost:3000/api/articles";
 
  private _deleteUrl = "http://localhost:3000/api/delete";
  private _fetchUrl = "http://localhost:3000/api/fetchback";
  private _updateArtURL = "http://localhost:3000/api/update-article";

  constructor(private http: HttpClient) { }

  getEvents() {
    return this.http.get<any>(this._articlesUrl)
  }



  deleteArticle(id) {
    console.log("to be dleted "+id);
    return this.http.delete<any>(this._deleteUrl+'/'+id);
  }

  fetchArticle(id) {
    return this.http.get<any>(this._fetchUrl+'/'+id);
  }

  updateAnArticle(updatedArticle) {
    console.log("updateAnArticle called");
    return this.http.put<any>(this._updateArtURL, updatedArticle);
  }
}
