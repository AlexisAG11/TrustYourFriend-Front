import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FeedService } from '../feed.service';
import { HttpHeaders } from '@angular/common/http';
import { AuthentificationService } from 'src/app/authentification/authentification.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-feed-center',
  templateUrl: './feed-center.component.html',
  styleUrls: ['./feed-center.component.css'],
  animations: [
    trigger('fadeOut', [
      transition(':leave', [
        animate('0.3s', style({ 
          opacity: 0,
          height: 0,
           }))
      ])
    ])
  ]
})
export class FeedCenterComponent implements OnInit,OnDestroy {

  sub: Subscription = new Subscription();
  sub2: Subscription = new Subscription();
  @Input() places = [];
  @Input() idUser = "";
  @Input() types: any[] = [];
  @Input() adresses: any[] = [];


  constructor(private feedService: FeedService, private authService: AuthentificationService){}

  ngOnInit(): void {
    this.sub2 = this.feedService.placeSubject.subscribe( data => {
      this.places = data.modifiedPlaces;
    })

    this.feedService.deletePlaceSubject.subscribe((id) => {
      this.places = this.places.filter((ele:any) => ele._id != id);
    })

  }



  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }

}
