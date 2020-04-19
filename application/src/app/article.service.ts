import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private _articlesUrl = "http://localhost:3000/api/articles";
  private _deleteUrl = "http://localhost:3000/api/delete";
  private _fetchUrl = "http://localhost:3000/api/fetchback";
  private _updateArtURL = "http://localhost:3000/api/update-article";
  private _updateArtUpvotesURL = "http://localhost:3000/api/update-upvotes";
  private _updateArtDownvotesURL = "http://localhost:3000/api/update-downvotes";

  clickedArticle : Object = {};

  constructor(private http: HttpClient) { }

  getEvents() {
    return this.http.get<any>(this._articlesUrl)
  }

  deleteArticle(id) {
    return this.http.delete<any>(this._deleteUrl+'/'+id);
  }

  fetchArticle(id) {
    return this.http.get<any>(this._fetchUrl+'/'+id);
  }

  updateAnArticle(updatedArticle) {
    return this.http.put<any>(this._updateArtURL, updatedArticle);
  }

  increaseUpvote(updatedArticle, id) {
    return this.http.put<any>(this._updateArtUpvotesURL+'/'+id, updatedArticle);
  }

  decreaseUpvote(updatedArticle, id) {
    return this.http.put<any>(this._updateArtDownvotesURL+'/'+id, updatedArticle);
  }

  setClickedArticleObj(id) {
    localStorage.setItem('__ai', id);
  }

  getClickedArticle() {
    return localStorage.getItem('__ai');
  }

  getArticleById(id: string): Observable<any>  {
    return this.getAllArticles()
      .pipe(
        map((articles: any[]) => articles.find(article => article.articleid === id))
      );
}

  getAllArticles() {
    return this.http.get<any>(this._articlesUrl)
  }
}
