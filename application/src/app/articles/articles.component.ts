import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  articles = []
  constructor(private _articleService: ArticleService, private router: Router) { }

  articledId : String = '';

  ngOnInit() {
    this._articleService.getEvents()
    .subscribe(
      res => this.articles = res,
      err => console.log(err)
    )
  }

  goToArticle(id) {
    /*
      THIS 'id' IS AN OBJECT. SO WE HAVE TO TAKE OUT articleID FROM THAT OBJECT.
      'articleID' IS ALREADY DEFINED IN MONGODB JSON. THEREFORE WE ARE PASSING id.articleid TO
      setClickedrticleObj METHOD BELOW */
    this._articleService.setClickedArticleObj(id.articleid);
    this.router.navigate(['/options']);
  }
}
