import { Injectable } from '@angular/core';
import { UserProfileService } from './user-profile.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private profileservice: UserProfileService,
    private router: Router
  ) { }

  processLogin(user: object) {

    return new Observable(observer => {
      try {
        this.extraSteps(user).subscribe({
          error: err => {
          },
          complete: () => {
            this.router.navigateByUrl('/articles')
          }
        })
      } catch{
      }
    });
  }

  extraSteps(data: any): Observable<any> {
    return new Observable(observer => {
      console.log("user's data: ", data);
      localStorage.setItem('token', data.token);
      localStorage.setItem('userProfile', JSON.stringify(data['user']));
      this.profileservice.setUserProfileValue(data['user']);
      this.profileservice.refreshProfileData(data['user']);
      observer.complete();
    });

  }

}
