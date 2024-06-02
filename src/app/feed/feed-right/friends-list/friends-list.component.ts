import { animate, style, transition, trigger } from '@angular/animations';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { catchError, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FeedService } from '../../feed.service';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css']
})
export class FriendsListComponent {

  @Input() friend: any;
  @Input() friends: any;

  constructor(private http: HttpClient,
              private feedService: FeedService
  ){}

  onDeleteFriend(name: string, id: string){
    const confirmationObject = {name: name, id: id, display: true};
    this.feedService.displayConfirmationFriendSubject.next(confirmationObject);
  }
  
}
