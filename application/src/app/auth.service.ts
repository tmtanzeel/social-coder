import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient, private _router: Router) { }
  private _registerUrl = "api/register";
  private _loginUrl = "api/login";
  private _contributeUrl = "api/contribute";
  private _askUrl = "api/ask";
  private _deleteArtURL = "api/delete-article";
  private _onlyMyArticlesUrl = "api/myarticles";

  registerUser(user) {
    return this._http.post<any>(this._registerUrl, user);
  }

  loginUser(user) {
    return this._http.post<any>(this._loginUrl, user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  pushNewPost(newPost) {
    return this._http.post<any>(this._contributeUrl, newPost);
  }

  pushNewQuest(newQuest) {
    //console.log("pushew Quest called");    
    return this._http.post<any>(this._askUrl, newQuest);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteAnArticle() {
    console.log("deleteAnArticle called");
    return this._http.delete<any>(this._deleteArtURL);
  }

  getMyArticles() {
    var person = localStorage.getItem('firstname') +" "+localStorage.getItem('lastname');
    return this._http.get<any>(this._onlyMyArticlesUrl+'/'+person);
  }

  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('firstname');
    localStorage.removeItem('lastname');
    this._router.navigate(['/articles']);
  }
}
