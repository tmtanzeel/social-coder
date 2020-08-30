import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../core/authentication/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  flag= {
    valid: true
  }

  message: string ='';

  loginUserData ={
    email: "",
    password: ""
  };

  constructor( 
    private _auth: AuthService, 
    private _router: Router,
    private loginService: LoginService
  ) {
  }

  ngOnInit() {
  }

 
  onSubmit() {
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
        console.log(res);
        // localStorage.setItem('token', res.token);
        // localStorage.setItem('firstname', res.user.firstName);
        // localStorage.setItem('lastname', res.user.lastName);
        // localStorage.setItem('userid', res.user.userid);
        // this._router.navigate(['/articles']);
        this.loginService.processLogin(res).subscribe();
      },
      err => {
        this.flag.valid=false,
        // document.querySelector('#login-denied').innerHTML="hello";
        this.message=err.error;
      }
    )
  }
}

//console.log(err.error)