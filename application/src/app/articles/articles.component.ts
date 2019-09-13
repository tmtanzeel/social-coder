import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  articles = []
  constructor(private _articleService: ArticleService) { }

  ngOnInit() {
    this._articleService.getEvents()
    .subscribe(
      res => this.articles = res,
      err => console.log(err)
    )
  }

  onPress(id) {
    this._articleService.getEvents()
    .subscribe (
      data => {
        document.querySelector('#data-container').innerHTML=data[id].content;
        document.querySelector('#contributor-container').innerHTML=data[id].contributor;
      }
    );
  }

}
