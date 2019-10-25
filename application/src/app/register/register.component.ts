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
      firstname:['', [Validators.required,Validators.minLength(4), Validators.pattern('[A-Za-z]{4,15}')]],
      lastname:['', [Validators.required,Validators.minLength(4), Validators.pattern('[A-Za-z]{4,15}')]],
      username: ['', [Validators.required,Validators.minLength(4), Validators.pattern('[A-Za-z0-9@._!]{4,25}')]],
      password: ['', [Validators.required, Validators.minLength(4)]],
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
    this.registerUserData.firstName=this.form.value.firstname;    
    this.registerUserData.lastName=this.form.value.lastname;    
    this.registerUserData.email=this.form.value.username;    
    this.registerUserData.password=this.form.value.password;    
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
