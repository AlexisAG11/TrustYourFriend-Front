import { animate, style, transition, trigger } from '@angular/animations';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { catchError, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { FeedService } from '../../feed.service';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css']
})
export class FriendsListComponent{

  @Input() friend: any;
  @Input() friends: any;

  constructor(private http: HttpClient,
              private feedService: FeedService
  ){}

  onDeleteFriend(name: string, id: string){
    if(confirm("Etes vous sûr de vouloir supprimer " + name)) {
      this.http.patch(environment.apiUrl + '/friends/delete',
        {
          friendId: id 
        }
      ).subscribe( data => {
        console.log(name + ' bien supprimer');
        const index = this.friends.indexOf(this.friend);
        if (index !== -1) {
          this.friends.splice(index, 1);
        }
        this.feedService.fetchAllPlaces().subscribe(data => {
          this.feedService.placeSubject.next(data)
        })
      })
    }
  }
  
}
