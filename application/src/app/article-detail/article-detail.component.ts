import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ArticleService } from '../article.service';
import { MessageService } from 'primeng/components/common/api';
import { findNode } from '@angular/compiler';

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
      this.updatedVotes.articleid=article.articleid;
      this.currentUpvotes=this.article.upvotes;
      this.currentDownvotes=this.article.downvotes;
      this.currentLoggedInUserId=localStorage.getItem('userid');
      this.articleDetails.upvotes=this.article.upvotes;
      this.articleDetails.downvotes=this.article.downvotes;
      document.querySelector('#data-container').innerHTML=this.article.content;
      this.onPageLoad();
  }

  onPageLoad() {
    if(this.isAnUpvoter()) {
      this.allowUpvote=false;
      this.allowDownvote=true;
    }
    else {
      this.allowUpvote=true;
      if(this.isADownvoter()) {
        this.allowDownvote=false;
        this.allowUpvote=true;
      }
      else {
        this.allowUpvote=true;
        this.allowDownvote=true;
      }
    }
  }

  isAnUpvoter(): boolean {
    let found=false;
    this.article.upvoters.forEach(user => {
      if(user===this.currentLoggedInUserId) {
        found=true;
      }
    });
    return found;
  }

  isADownvoter(): boolean {
    let found=false;
    this.article.downvoters.forEach(user => {
      if(user===this.currentLoggedInUserId) {
        found=true;
      }
    });
    return found;
  }

  back() {
    this.router.navigate(['/articles'])
  }

  upvoted() {
    console.log("upvoted");
    this.allowUpvote=false;
    this.allowDownvote=true;
    if(this.isADownvoter()) {
      // increase 1 upvote
      this.updatedVotes.downvotes=this.article.downvotes;
      this.currentUpvotes=(this.article.upvotes)+1;
      this.updatedVotes.upvotes=this.currentUpvotes;
      // Decrease 1 downvote
      this.updatedVotes.upvotes=this.article.upvotes;
      this.currentDownvotes=(this.article.downvotes)-1;
      this.updatedVotes.downvotes=this.currentDownvotes;
      this.removeUserFromDownvotersList();
      this.addUserToUpvotersList();
      console.log(this.updatedVotes.upvotes);
      //this.onPageLoad();
    }
    else {
      // increase 1 upvote
      this.updatedVotes.downvotes=this.article.downvotes;
      this.currentUpvotes=(this.article.upvotes)+1;
      this.updatedVotes.upvotes=this.currentUpvotes;
      this.addUserToUpvotersList();
      console.log(this.updatedVotes.upvotes);
      //this.onPageLoad();
    }
    console.log(this.allowUpvote+" "+this.allowDownvote);
    

  }

  downvoted() {
    console.log("downvoted");
    this.allowUpvote=true;
    this.allowDownvote=false;
    if(this.isAnUpvoter()) {
      // decrease 1 upvote
      this.currentUpvotes=(this.article.upvotes)-1;
      this.updatedVotes.upvotes=this.currentUpvotes;
      this.updatedVotes.downvotes=this.article.downvotes;
      // increase 1 downvote
      this.updatedVotes.upvotes=this.article.upvotes;
      this.currentDownvotes=(this.article.downvotes)+1;
      this.updatedVotes.downvotes=this.currentDownvotes;
      this.removeUserFromUpvotersList();
      this.addUserToDownvotersList();
      console.log(this.updatedVotes.downvotes);
      //this.onPageLoad();
    }
    else {
      // increase 1 downvote
      this.updatedVotes.upvotes=this.article.upvotes;
      this.currentDownvotes=(this.article.downvotes)+1;
      this.updatedVotes.downvotes=this.currentDownvotes;
      this.addUserToDownvotersList();
      console.log(this.updatedVotes.downvotes);
      //this.onPageLoad();
    }
    console.log(this.allowUpvote+" "+this.allowDownvote);
  }

  addUserToUpvotersList() {
    this.updatedVotes.upvoters.push(localStorage.getItem('userid'));
    this._articleService.addUserToUpvotersList(this.updatedVotes, localStorage.getItem('userid'), this.article.articleid )
    .subscribe (
      res => {
      },
      err => console.log(err)
    );
  }

  removeUserFromUpvotersList() {
    this.updatedVotes.upvoters.push(localStorage.getItem('userid'));
    this._articleService.removeUserFromUpvotersList(this.updatedVotes, localStorage.getItem('userid'), this.article.articleid)
    .subscribe (
      res => {
      },
      err => console.log(err)
    );
  }

  addUserToDownvotersList() {
    this.updatedVotes.downvoters.push(localStorage.getItem('userid'));
    this._articleService.addUserToDownvotersList(this.updatedVotes, localStorage.getItem('userid'), this.article.articleid )
    .subscribe (
      res => {
      },
      err => console.log(err)
    );
  }

  removeUserFromDownvotersList() {
    this.updatedVotes.upvoters.push(localStorage.getItem('userid'));
    this._articleService.removeUserFromDownvotersList(this.updatedVotes, localStorage.getItem('userid'), this.article.articleid)
    .subscribe (
      res => {
      },
      err => console.log(err)
    );
  }
}