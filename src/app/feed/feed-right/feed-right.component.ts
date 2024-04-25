import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FeedService } from '../feed.service';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/authentification/authentification.service';

@Component({
  selector: 'app-feed-right',
  templateUrl: './feed-right.component.html',
  styleUrls: ['./feed-right.component.css']
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
      this.activeUser = data.userName;
      console.log(this.friends);
    })

  }
  

  logout(){
    this.authService.deleteLocalStorage();
    this.router.navigate(['/auth']);

  }

}
