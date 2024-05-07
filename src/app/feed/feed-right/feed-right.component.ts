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
  activeUser: string = "";

  constructor(private feedService: FeedService,
              private router: Router,
              private authService: AuthentificationService){}

  ngOnInit(): void {
    this.sub = this.feedService.fetchAllFriend().subscribe(data => {
      this.friends = data.friends;
      console.log(this.friends);
      this.activeUser = data.userName;
    })
  }
  

  logout(){
    this.authService.deleteLocalStorage();
    this.router.navigate(['/auth']);
  }

  addFriend(){
    this.router.navigate(['/add-friends'])
  }

}
