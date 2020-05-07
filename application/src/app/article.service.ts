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
  private _addToUpvotersListURL = "http://localhost:3000/api/add-to-upvoters-list";
  private _deleteFromUpvotersListURL = "http://localhost:3000/api/remove-from-upvoters-list";
  private _addToDownvotersListURL = "http://localhost:3000/api/add-to-downvoters-list";
  private _deleteFromDownvotersListURL = "http://localhost:3000/api/remove-from-downvoters-list";
  private _updateArtUpvotesURL = "http://localhost:3000/api/update-upvotes";
  private _updateArtDownvotesURL = "http://localhost:3000/api/update-downvotes";
  private _updateDownvotersListURL = "http://localhost:3000/api/update-upvoters-list";


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
    console.log("called increaseUpvote");
    console.log(id);
    console.log(updatedArticle);
    return this.http.put<any>(this._updateArtUpvotesURL+'/'+id, updatedArticle);
  }

  addUserToUpvotersList(updatedArticle, id, id1) {
    return this.http.put<any>(this._addToUpvotersListURL+'/'+id+'/'+id1, updatedArticle);
  }

  removeUserFromUpvotersList(updatedArticle, id, id1) {
    return this.http.delete<any>(this._deleteFromUpvotersListURL+'/'+id+'/'+id1, updatedArticle);
  }

  addUserToDownvotersList(updatedArticle, id, id1) {
    return this.http.put<any>(this._addToDownvotersListURL+'/'+id+'/'+id1, updatedArticle);
  }

  removeUserFromDownvotersList(updatedArticle, id, id1) {
    return this.http.delete<any>(this._deleteFromDownvotersListURL+'/'+id+'/'+id1, updatedArticle);
  }

  decreaseUpvote(updatedArticle, id) {
    console.log("called decreaseUpvote");
    console.log(id);
    console.log(updatedArticle);
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
