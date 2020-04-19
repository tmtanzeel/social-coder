import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  article;
  articleDetails : { title?: string, content?: string, contributor?: string, upvotes?: number, upvoters?: string[], downvotes?: number, downvoters?: string[] } = { content: '' };

  

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

  constructor(private messageService: MessageService, private router: Router, private _articleService: ArticleService, private _router: ActivatedRoute) { }

  showUpvoteConfirmation() {
    this.messageService.add({severity:'success', summary:'Success Message', detail:'Your upvote is added'});
  }

  showDownvoteConfirmation() {
    this.messageService.add({severity:'success', summary:'Success Message', detail:'Your downvote is added'});
  }

  ngOnInit() {
    const id=this._router.snapshot.paramMap.get('id');
    this.getArticleById(id);
  }

  getArticleById(id: string) {
    this._articleService.getArticleById(id).subscribe({
      next: product => this.onAlbumRetrieved(product)
    })
  }

  // to keep the code clean and extend some functionality
  onAlbumRetrieved(article: any): void {
      this.article = article;
      this.currentUpvotes=this.article.upvotes;
      this.currentDownvotes=this.article.downvotes;
      document.querySelector('#data-container').innerHTML=this.article.content;
      for(var i=0;i<5;i++) {
        if(this.currentLoggedInUserId==this.article.upvoters[i]) {
          this.allowUpvote=false;
        }
      }
      for(var i=0;i<5;i++) {
        if(this.currentLoggedInUserId==this.article.downvoters[i]) {
          this.allowDownvote=false;
        }
      }
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