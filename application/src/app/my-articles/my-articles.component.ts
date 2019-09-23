
import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-my-articles',
  templateUrl: './my-articles.component.html',
  styleUrls: ['./my-articles.component.css']
})
export class MyArticlesComponent implements OnInit {

  articles = []
  constructor(private _articleService: ArticleService) { }

  ngOnInit() {
    this._articleService.getMyArticles()
    .subscribe(
      res => this.articles = res,
      err => console.log(err)
    )
  }

  onPress(id) {
    this._articleService.deleteArticle(id)
    .subscribe (
      data => {
        console.log("hello");
      }
    );
  }
}
