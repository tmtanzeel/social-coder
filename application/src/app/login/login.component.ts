import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  loginUserData ={
    email: "",
    password: ""
  };

  constructor( private fb: FormBuilder, private _auth: AuthService, private _router: Router) { 
    this.form  = this.fb.group({
      username: ['', [Validators.required,Validators.minLength(4)]],
      password: ['', [Validators.required,Validators.minLength(4)]] 
    });

  }

  ngOnInit() {
  }

  onSubmit(){
    if (!this.form.valid) return;

    // console.log(this.form.controls.zip);
    this.form.markAsTouched();
    this.loginUserData.email=this.form.value.username;
    this.loginUserData.password=this.form.value.password;
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', res.token);
        localStorage.setItem('firstname', res.user.firstName);
        localStorage.setItem('lastname', res.user.lastName);
        this._router.navigate(['/articles']);
      },
      err => console.log(err)
    )
  }
}
