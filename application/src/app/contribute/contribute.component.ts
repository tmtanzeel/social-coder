import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MessageService } from 'primeng/components/common/api';

@Component({
  selector: 'app-contribute',
  templateUrl: './contribute.component.html',
  styleUrls: ['./contribute.component.css']
})
export class ContributeComponent implements OnInit {
  makeNewPost={
    articleid: "",
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
    this.messageService.add({severity:'success', summary:'Success Message', detail:'Article submitted'});
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

  @ViewChild('searchInput', {static: false}) searchInputRef: ElementRef;

  onSubmit() {
    
    var titleFromField = (<HTMLInputElement>document.getElementById("inputTitle")).value;
    var content = this.editorForm.get('editor').value;
    var contributor = localStorage.getItem('firstname') +" "+localStorage.getItem('lastname');
    
    var date = new Date().toUTCString();
    var randomId=Math.random().toString(36).substr(2, 9);

    this.makeNewPost.articleid=randomId;
    this.makeNewPost.title=titleFromField;
    this.makeNewPost.content=content;
    this.makeNewPost.date=date;
    this.makeNewPost.contributor=contributor; 

    this._auth.pushNewPost(this.makeNewPost)
    .subscribe (
      res => {
        (<HTMLInputElement>document.getElementById("inputTitle")).value="";
        this.editorForm.reset();
        this.addSingle();
      },
      err => console.log(err)
    );
  }
}
