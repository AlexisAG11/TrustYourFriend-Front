import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FeedService } from '../feed.service';
import { HttpHeaders } from '@angular/common/http';
import { AuthentificationService } from 'src/app/authentification/authentification.service';

@Component({
  selector: 'app-feed-center',
  templateUrl: './feed-center.component.html',
  styleUrls: ['./feed-center.component.css']
})
export class FeedCenterComponent implements OnInit,OnDestroy {

  sub: Subscription = new Subscription();
  places = [];
  idUser = "";
  constructor(private feedService: FeedService, private authService: AuthentificationService){}

  ngOnInit(): void {
    this.sub = this.feedService.fetchAllPlaces().subscribe(data => {
      this.places = data.places;
      this.idUser = data.user;
    })
  }



  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
