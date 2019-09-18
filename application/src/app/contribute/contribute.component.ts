import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

//import { MyApiService } from '../services/myapi.service';
import { Posts } from '../classes/posts';

//import { Comments } from '../classes/comments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { MessageService } from 'primeng/components/common/api';


@Component({
  selector: 'app-contribute',
  templateUrl: './contribute.component.html',
  styleUrls: ['./contribute.component.css']
})
export class ContributeComponent implements OnInit {
  makeNewPost={
    title: "",
    content: "",
    date: "",
    contributor: ""
  };

  // inject: private _myApiService: MyApiService
  constructor(private messageService: MessageService, private _auth: AuthService, private _router: Router) { }

  editorForm: FormGroup;
  //lstarts: Posts[];
  //lstcomments: Comments[];

  editorStyle = {
    height: '300px',
    backgroundColor: '#ffffff'
  }

  addSingle() {
    this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
  }

  config = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['code-block'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }]
    ]
  }

  ngOnInit() {
    this.editorForm = new FormGroup({
      'editor': new FormControl(null)
    });
  }

  onSubmit() {
    var titleFromField = (<HTMLInputElement>document.getElementById("inputTitle")).value;
    var content = this.editorForm.get('editor').value;
    var contributor = localStorage.getItem('firstname') +" " +localStorage.getItem('lastname');
    console.log(contributor);
    
    var date = new Date().toUTCString();

    /*
    console.log(titleFromField);
    console.log(content);
    console.log(date);
    */

    this.makeNewPost.title=titleFromField;
    this.makeNewPost.content=content;
    this.makeNewPost.date=date;
    this.makeNewPost.contributor=contributor; 

    this._auth.pushNewPost(this.makeNewPost)
    .subscribe (
      res => {
        //console.log(res);
        //this._router.navigate(['/articles']);
      },
      err => console.log(err)

    );
  }
}
