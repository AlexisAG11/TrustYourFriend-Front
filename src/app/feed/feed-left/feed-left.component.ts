import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { FeedService } from '../feed.service';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-feed-left',
  templateUrl: './feed-left.component.html',
  styleUrls: ['./feed-left.component.css']
})
export class FeedLeftComponent {
  sub: Subscription = new Subscription();
  friends:any[] = [];
  activeUser: string = "";
  filterParams: string = "";
  queryParams = new HttpParams();
  
  constructor(private feedService: FeedService){}

  ngOnInit(): void {
    this.sub = this.feedService.fetchAllFriend().subscribe(data => {
      console.log(data)
      this.friends = data.friends;
      this.friends.forEach(element => {
        element['checkboxFilled'] = false;
      });
      this.friends.push({'_id': data.userId, 'name': "Moi", 'checkboxFilled': false})
      console.log(this.friends);
      this.activeUser = data.userName;
    })
  }

  filterByName(friend: {_id: string, name: string, checkboxFilled: boolean}){
    friend.checkboxFilled = friend.checkboxFilled === false ? true : false;
    console.log(friend);
    if (friend.checkboxFilled) {
      this.queryParams = this.queryParams.append('nameID', friend._id);
    }
    else {
      const currentValue = this.queryParams.getAll('nameID');
      if (currentValue) {
        const updatedValue = currentValue.filter(value => value !== friend._id);
        if (updatedValue) {
          this.queryParams = this.queryParams.set('nameID', updatedValue.join(','));
        }
        else {
          this.queryParams = new HttpParams();
        }
      }
    }
    console.log(this.queryParams);
    this.feedService.fetchAllPlaces(this.queryParams).subscribe(data => {
      this.feedService.placeSubject.next(data)
    })
  }
}
