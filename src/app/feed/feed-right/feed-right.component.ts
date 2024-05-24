import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FeedService } from '../feed.service';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/authentification/authentification.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { FriendsListComponent } from './friends-list/friends-list.component';

@Component({
  selector: 'app-feed-right',
  templateUrl: './feed-right.component.html',
  styleUrls: ['./feed-right.component.css'],
  animations: [
    trigger('fadeOut', [
      transition(':leave', [
        animate('0.3s', style({ 
          opacity: 0,
          height: 0,
          marginTop: -10, // compense the gap of 10px for a smooth transition
          marginBottom: 0 }))
      ])
    ])
  ]
})
export class FeedRightComponent implements OnInit {

  sub: Subscription = new Subscription();
  friends = [];
  sentFriendRequests = [];
  receivedFriendRequests = [];
  activeUser: string = "";
  isFriendList = true;

  constructor(private feedService: FeedService,
              private router: Router,
              private authService: AuthentificationService){}

  ngOnInit(): void {
    this.sub = this.feedService.fetchAllFriends().subscribe(data => {
      const dataCopy = {...data};
      // remove the activeUser from the friends list
      this.friends = dataCopy.friends.filter((ele:any)=> ele._id !== data.userId);
      this.sentFriendRequests = dataCopy.sentFriendRequests;
      this.receivedFriendRequests = dataCopy.receivedFriendRequests;
      this.activeUser = data.userName;
      console.log(this.sentFriendRequests);
      console.log(this.receivedFriendRequests);
    })
  }
  

  logout(){
    this.authService.deleteLocalStorage();
    this.router.navigate(['/auth']);
  }

  addFriend(){
    this.router.navigate(['/add-friends'])
  }

  onAcceptFriendRequest(requestId: string, receivedFriendRequest: never){
    this.feedService.acceptFriendRequest(requestId).subscribe(data => {
      // remove in the request array
      const index = this.receivedFriendRequests.indexOf(receivedFriendRequest);
      if (index !== -1) {
        this.receivedFriendRequests.splice(index, 1);
      }
      // add in the friends array without calling backend
      this.friends.push(receivedFriendRequest);
      this.isFriendList = true;
      this.feedService.addFriendSubject.next(receivedFriendRequest);
      // refresh the place
      this.feedService.fetchAllPlaces().subscribe(data => {
        this.feedService.placeSubject.next(data)
      })
    })
  }

  onDeclineFriendRequest(requestId: string, receivedFriendRequest: never){
    this.feedService.declineFriendRequest(requestId).subscribe(data => {
      // remove in the request array
      const index = this.receivedFriendRequests.indexOf(receivedFriendRequest);
      if (index !== -1) {
        this.receivedFriendRequests.splice(index, 1);
      }
      this.isFriendList = true;
    })
  }

}
