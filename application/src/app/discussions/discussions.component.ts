import { Component, OnInit } from '@angular/core';
import { DiscussionService } from '../discussion.service';


@Component({
  selector: 'app-discussions',
  templateUrl: './discussions.component.html',
  styleUrls: ['./discussions.component.css']
})
export class DiscussionsComponent implements OnInit {

  discussions = []
  constructor(private _discussionService: DiscussionService) { }

  ngOnInit() {
    this._discussionService.getDiscussions()
    .subscribe(
      res => this.discussions = res,
      err => console.log(err)
    )
  }

  onPress(id) {
    this._discussionService.getDiscussions()
    .subscribe (
      data => {
        document.querySelector('#data-container').innerHTML=data[id].qcontent        
      }
    );
  }

}
