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
  articleDetails : { content?: string, upvotes?: number, upvoters?: string[] } = { content: '' };

  downvotes: number = 5;

  currentLoggedInUserId: string;

  allowUpvote=true;
  msg1="I found this article very useful.";
  msg2="You've already upvoted this article.";

  constructor(private router: Router, private _articleService: ArticleService) { }

  ngOnInit() {
    this.articleId = this._articleService.getClickedArticle();
    this._articleService.fetchArticle(this.articleId).subscribe(article=>{
    this.articleDetails  = article;
    //console.log(this.articleDetails);
    document.querySelector('#data-container').innerHTML=this.articleDetails.content;
    console.log(this.articleDetails.upvoters);
    this.currentLoggedInUserId=localStorage.getItem('userid');
    for(var i=0;i<5;i++) {
      if(this.currentLoggedInUserId==this.articleDetails.upvoters[i]) {
        this.allowUpvote=false;
      }
    }
  });

    
    //console.log(this.incomingArticleObject);
  }

  back() {
    this.router.navigate(['/articles'])
  }

  upvoted() {
    console.log("User has upvoted this article");
    console.log("Current upvotes: "+this.articleDetails.upvotes);
  }
}


