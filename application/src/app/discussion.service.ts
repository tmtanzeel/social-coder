import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DiscussionService {
  private _discussionsUrl = "http://localhost:3000/api/discussions";
  constructor(private http: HttpClient) { }

  getDiscussions() {
    return this.http.get<any>(this._discussionsUrl)
  }
}
