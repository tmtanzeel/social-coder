import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient, private _router: Router) { }
  private _registerUrl = "http://localhost:3000/api/register";
  private _loginUrl = "http://localhost:3000/api/login";
  private _contributeUrl = "http://localhost:3000/api/contribute";
  private _askUrl = "http://localhost:3000/api/ask";

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

  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('firstname');
    localStorage.removeItem('lastname');
    this._router.navigate(['/articles']);
  }
}
