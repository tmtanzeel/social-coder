import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.css']
})
export class AskComponent implements OnInit {

  makeNewQuest = {
    qtitle: "",
    qcontent: "Demo content",
    date: "12 Oct",
    askedby: "Maximillian",
    answers: [],
    tags: []
  };

  constructor(private _auth: AuthService, private _router: Router) { }

  editorForm: FormGroup;
  
  editorStyle = {
    height: '300px',
    backgroundColor: '#ffffff'
  }

  config = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['code-block'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      ['link']
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
    var askedby = localStorage.getItem('firstname') + " " + localStorage.getItem('lastname');
    var date = new Date().toUTCString();

    this.makeNewQuest.qtitle = titleFromField;
    this.makeNewQuest.qcontent = content;
    this.makeNewQuest.date = date;
    this.makeNewQuest.askedby = askedby;
    this._auth.pushNewQuest(this.makeNewQuest)
      .subscribe(
        res => {
          this._router.navigate(['/discussions']);
        },
        err => console.log(err)
      );
  }
}
