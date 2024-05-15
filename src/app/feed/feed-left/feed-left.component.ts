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
  types:any[] = [];
  addresses:any[] = [];
  activeUser: string = "";
  filterParams: string = "";
  queryParams = new HttpParams();
  
  constructor(private feedService: FeedService){}

  ngOnInit(): void {
    this.sub = this.feedService.fetchAllFriends().subscribe(data => {
      console.log(data)
      this.friends = data.friends;
      this.friends.forEach(element => {
        element['checkboxFilled'] = false;
      });
      this.friends.push({'_id': data.userId, 'name': data.userName, 'checkboxFilled': false});
      this.types = this.feedService.getTypes();
      this.feedService.fetchAllAddresses().subscribe((data) => {
        this.addresses = data;
      });
      console.log(this.friends);
      this.activeUser = data.userName;
      console.log(this.friends.length);
    })

    this.feedService.friendSubject.subscribe((id) => {
      this.friends = this.friends.filter(ele => ele._id != id);
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
        if (updatedValue.length !== 0) {
          this.queryParams = this.queryParams.delete('nameID');
          updatedValue.forEach(element => {
            this.queryParams = this.queryParams.append('nameID', element);
          });
        }
        else {
          this.queryParams = new HttpParams();
        }
      }
    }
    this.feedService.fetchAllPlaces(this.queryParams).subscribe(data => {
      this.feedService.placeSubject.next(data)
    })
  }

  filterByType(type: {name: string, checkboxFilled: boolean}){
    type.checkboxFilled = type.checkboxFilled === false ? true : false;
  }
  filterByAddress(address: {name: string, checkboxFilled: boolean}){
    address.checkboxFilled = address.checkboxFilled === false ? true : false;
  }

}
