import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  articles = [];
  filteredArticles=[];

  constructor(private _articleService: ArticleService, private router: Router) { }

  articledId : String = '';
  text='';
  resulttext="all";

  ngOnInit() {
    this._articleService.getEvents()
    .subscribe(
      res => {
        this.articles = res,
        this.filteredArticles = res},
      err => console.log(err)
    )
  }

  pressed(text: string) {
    this.resulttext=text;
    this.CallSearch(text);
  }

  CallSearch(text: string) {
    this.SearchFunction(text);
  }

  SearchFunction(text: string) {
    this.filteredArticles=(this.articles.filter(e => {
      return e.title.toLocaleLowerCase() === text.toLocaleLowerCase ||
      e.title.toLowerCase().indexOf(text.toLowerCase()) >= 0
    }));
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
