import { Injectable } from '@angular/core';
import { Profile, ProfileAdapter } from '../adaptors/profile.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private _userProfile$: BehaviorSubject<Profile>;
  public _userProfile: Profile;

  constructor(
    private http: HttpClient,
    private adapter: ProfileAdapter,
    private auth: AuthService
  ) {
    this._userProfile$ = new BehaviorSubject<Profile>(JSON.parse(localStorage.getItem('userProfile')));
   }

   get userProfile$() {
    return this._userProfile$.asObservable();
  }
  setUserProfileValue(data) {
    this._userProfile$.next(data);
  }

  setProfileData(data) {
      this.setUserProfileValue(data);
  }

  refreshProfileData(data: any) {
    return new Observable(observer => {
    observer.next(this.adapter.adapt(data));
    });
}


}
