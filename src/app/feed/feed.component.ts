import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification/authentification.service';
import { Subscription } from 'rxjs';
import { FeedService } from './feed.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  displayConfirmation: boolean = false;
  idFriend: string = "";
  nameFriend: string = "";
  messageDelete: string = "";
  idPlace: string = "";
  namePlace: string = "";

  constructor(private feedService: FeedService){}

  ngOnInit(): void {
    // when we call the confirmation dialog for deleting a friend
    this.feedService.displayConfirmationFriendSubject.subscribe((data) => {
      this.displayConfirmation = data.display;
      this.idFriend = data.id;
      this.nameFriend = data.name;
      this.messageDelete = `Supprimer ${this.nameFriend} ?`
    })

    this.feedService.displayConfirmationDeletePlaceSubject.subscribe((data) => {
      this.displayConfirmation = data.display;
      this.idPlace = data.id;
      this.namePlace = data.name;
      this.messageDelete = `Supprimer ${this.namePlace} ?`
    })
  }
}
