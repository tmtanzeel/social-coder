import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../article.service';

export interface MyObject {
  content: string;
}
@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  articleId : String = '';
  articleDetails : { content?: string } = { content: '' };
  //incomingArticleObject: { content?: string } = { content: '' };

  constructor(private router: Router, private _articleService: ArticleService) { }

  ngOnInit() {
    this.articleId = this._articleService.getClickedArticle();
    this._articleService.fetchArticle(this.articleId).subscribe(article=>{
    this.articleDetails  = article;
    //console.log(this.articleDetails);
    document.querySelector('#data-container').innerHTML=this.articleDetails.content;
    });

    
    //console.log(this.incomingArticleObject);
  }

  back(){
    this.router.navigate(['/articles'])
  }
}


