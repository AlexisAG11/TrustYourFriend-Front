import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { FeedService } from '../feed.service';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-feed-left',
  templateUrl: './feed-left.component.html',
  styleUrls: ['./feed-left.component.css']
})
export class FeedLeftComponent {
  sub: Subscription = new Subscription();
  friends:any[] = [];
  @Input() types:any[] = [];
  @Input() adresses:any[] = [];
  activeUser: string = "";
  filterParams: string = "";
  queryParams = new HttpParams();
  inFiltering: boolean = false;

  @Input() mobileMode:any;

  constructor(private feedService: FeedService){}

  ngOnInit(): void {
    this.feedService.fetchAllFriends().subscribe(data => {
      this.friends = data.friends;
    });

    this.feedService.deleteFriendSubject.subscribe((id) => {
      this.friends = this.friends.filter(ele => ele._id != id);
    });

    this.feedService.addFriendSubject.subscribe((receivedFriendRequest) => {
      const receivedFriendRequestMaj = {...receivedFriendRequest, checkboxFilled: false}
      this.friends.push(receivedFriendRequestMaj);
    });

  }

  filterByName(friend: {_id: string, name: string, checkboxFilled: boolean}){
    friend.checkboxFilled = friend.checkboxFilled === false ? true : false;
    // filtering loader
    this.feedService.inFilteringSubject.next(true);
    this.inFiltering = true;
    if (friend.checkboxFilled) {
      this.queryParams = this.queryParams.append('nameID', friend._id);
    }
    else {
      // unfilter one element
      const currentValue = this.queryParams.getAll('nameID');
      if (currentValue) {
        // updatedValue that take account the unselection of one element
        const updatedValue = currentValue.filter(value => value !== friend._id);
          // delete queryparams then recreate one on the updated element
          this.queryParams = this.queryParams.delete('nameID');
          updatedValue.forEach(element => {
            this.queryParams = this.queryParams.append('nameID', element);
          });      
      }
    }
    this.feedService.fetchAllPlaces(this.queryParams).subscribe(data => {
      this.feedService.inFilteringSubject.next(false);
      this.feedService.placeSubject.next(data) // reload the place in the center
    })
  }

  filterByType(type: {name: string, checkboxFilled: boolean}){
    type.checkboxFilled = type.checkboxFilled === false ? true : false;
    this.feedService.inFilteringSubject.next(true);
    this.inFiltering = true;
    if (type.checkboxFilled) {
      this.queryParams = this.queryParams.append('typeID', type.name);
    }
    else {
      const currentValue = this.queryParams.getAll('typeID');
      if (currentValue) {
        const updatedValue = currentValue.filter(value => value !== type.name);
        this.queryParams = this.queryParams.delete('typeID');
        updatedValue.forEach(element => {
          this.queryParams = this.queryParams.append('typeID', element);
        });
      }
    }
    this.feedService.fetchAllPlaces(this.queryParams).subscribe(data => {
      this.feedService.inFilteringSubject.next(false);
      this.feedService.placeSubject.next(data);
    })
  }
  
  filterByAddress(address: {name: string, checkboxFilled: boolean}){
    address.checkboxFilled = address.checkboxFilled === false ? true : false;
    this.feedService.inFilteringSubject.next(true);
    this.inFiltering = true;
    if (address.checkboxFilled) {
      this.queryParams = this.queryParams.append('addressID', address.name);
    }
    else {
      const currentValue = this.queryParams.getAll('addressID');
      if (currentValue) {
        const updatedValue = currentValue.filter(value => value !== address.name);
        this.queryParams = this.queryParams.delete('addressID');
        updatedValue.forEach(element => {
          this.queryParams = this.queryParams.append('addressID', element);
        });
      }
    }
    this.feedService.fetchAllPlaces(this.queryParams).subscribe(data => {
      this.feedService.inFilteringSubject.next(false);
      this.feedService.placeSubject.next(data)
    })
  }

// <!--  -->
// <!--  -->
// <!--  -->
// <!-- MOBILE MODE -->
// <!--  -->
// <!--  -->
// <!--  -->

  filterMobile(){
    this.feedService.activeDisplayFilter.next();
  }
  onClearFilter(){
    this.friends.forEach(friend => {
      friend.checkboxFilled = false; // Access each friend directly
    });
    this.types.forEach(type => {
      type.checkboxFilled = false; // Access each friend directly
    });
    this.adresses.forEach(address => {
      address.checkboxFilled = false; // Access each friend directly
    });
    this.feedService.fetchAllPlaces().subscribe(data => {
      this.feedService.inFilteringSubject.next(false);
      this.feedService.placeSubject.next(data) // reload the place in the center
    })
  }


}
