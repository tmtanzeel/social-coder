import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../article.service';
import { MessageService } from 'primeng/components/common/api';

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
  articleDetails : { content?: string, upvotes?: number, upvoters?: string[], downvotes?: number, downvoters?: string[] } = { content: '' };

  

  currentLoggedInUserId: string;

  currentUpvotes=this.articleDetails.upvotes;
  currentDownvotes=this.articleDetails.downvotes;

  allowUpvote=true;
  allowDownvote=true;

  msg1="I found this article very useful.";
  msg2="You've already upvoted this article.";

  msg3="Useless! Not worth anyone's time.";
  msg4="You've already dpwnvoted this article.";


  updatedVotes={
    articleid: "",
    upvotes: 0,
    downvotes: 0,
    upvoters: [],
    downvoters: []
  };

  constructor(private messageService: MessageService, private router: Router, private _articleService: ArticleService) { }

  showUpvoteConfirmation() {
    this.messageService.add({severity:'success', summary:'Success Message', detail:'Your upvote is added'});
  }

  showDownvoteConfirmation() {
    this.messageService.add({severity:'success', summary:'Success Message', detail:'Your downvote is added'});
  }

  ngOnInit() {
    this.articleId = this._articleService.getClickedArticle();
    this._articleService.fetchArticle(this.articleId).subscribe(article=>{
    this.articleDetails  = article;
    this.currentUpvotes=this.articleDetails.upvotes;
    this.currentDownvotes=this.articleDetails.downvotes;
    document.querySelector('#data-container').innerHTML=this.articleDetails.content;
    this.currentLoggedInUserId=localStorage.getItem('userid');
    for(var i=0;i<5;i++) {
      if(this.currentLoggedInUserId==this.articleDetails.upvoters[i]) {
        this.allowUpvote=false;
      }
    }
    for(var i=0;i<5;i++) {
      if(this.currentLoggedInUserId==this.articleDetails.downvoters[i]) {
        this.allowDownvote=false;
      }
    }
    });
  }

  back() {
    this.router.navigate(['/articles'])
  }

  upvoted() {
    this.allowUpvote=false;
    this.allowDownvote=true;
    this.showUpvoteConfirmation();
    this.updatedVotes.articleid=""+this.articleId;
    this.updatedVotes.upvotes=this.articleDetails.upvotes+1;
    this.updatedVotes.downvotes=this.articleDetails.downvotes+1;
    this.currentDownvotes--;
    this.currentUpvotes++;
    this.updatedVotes.upvoters.push(localStorage.getItem('userid'));
    this._articleService.increaseUpvote(this.updatedVotes, localStorage.getItem('userid'))
    .subscribe (
      res => {
      },
      err => console.log(err)
    );   
  }

  downvoted() {
    this.allowUpvote=true;
    this.allowDownvote=false;
    this.showDownvoteConfirmation();
    this.updatedVotes.articleid=""+this.articleId;
    this.updatedVotes.downvotes=this.articleDetails.downvotes+1;
    this.updatedVotes.upvotes=this.articleDetails.upvotes-1;
    this.currentDownvotes++;
    this.currentUpvotes--;
    this.updatedVotes.downvoters.push(localStorage.getItem('userid'));
    this.updatedVotes.upvoters=this.articleDetails.upvoters;
    this.updatedVotes.upvoters=this.updatedVotes.upvoters.splice(this.updatedVotes.upvoters.indexOf(localStorage.getItem('userid')), 1 );
    this._articleService.decreaseUpvote(this.updatedVotes, localStorage.getItem('userid'))
    .subscribe (
      res => {
      },
      err => console.log(err)
    );   
  }
}