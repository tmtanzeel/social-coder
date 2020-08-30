import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { Profile } from '../core/adaptors/profile.model';
import { UserProfileService } from '../core/authentication/user-profile.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public userProfile$: Subscription;
  public userProfile: Profile;

  constructor(
    public _authService: AuthService,
    private profileservice: UserProfileService,
  ) { 
    this.userProfile$ = this.profileservice.userProfile$.subscribe(
      userProfile$ => {
        this.userProfile = userProfile$
      }
    );
  }

  ngOnInit() {
  }
}
