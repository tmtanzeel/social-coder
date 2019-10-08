import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { passValidator } from './validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData ={
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  };

  form: FormGroup;

  constructor(private fb: FormBuilder, private _auth: AuthService, private _router: Router) { 
    this.form  = this.fb.group({
      username: ['', [Validators.required,Validators.minLength(4)]],
      password: '',
      cnfpass: ['', [Validators.required, Validators.minLength(4), passValidator]]
    });

    this.form.controls.password.valueChanges
    .subscribe(
      x => this.form.controls.cnfpass.updateValueAndValidity()
    )
  }

  ngOnInit() {
  }

  registerUser() {
    if (!this.form.valid) return;
    this.form.markAsTouched();
    this._auth.registerUser(this.registerUserData)
    .subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this._router.navigate(['/articles']);
      },
      err => console.log(err)
    )
  }

}
