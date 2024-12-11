import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FeedService } from '../feed/feed.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-confiration-dialog',
  templateUrl: './confiration-dialog.component.html',
  styleUrls: ['./confiration-dialog.component.css'],
  animations: [
    trigger ('fadeInOut', [
      transition (':enter', [
        style({ opacity: 0}), // Initial style
        animate('0.2s', style({ opacity: 1})) // Animation
      ]),
      transition(':leave', [
        animate('0.1s', style({ opacity: 0,}))
      ])
    ])
  ]
})
export class ConfirationDialogComponent implements OnInit{


  @Input() idFriend: any;
  @Input() nameFriend: any;
  @Input() message: any;
  @Input() addressConfirmation: any;
  @Input() typeConfirmation: any;
  @Input() idPlace: any;
  @Input() namePlace: any;



  constructor(
    private feedService: FeedService,
    private http: HttpClient
  ){}

  ngOnInit(): void {
  }

  onConfirm(){
    if (this.idFriend !== undefined && this.idFriend !== "") {
      this.http.patch(environment.apiUrl + '/friends/delete',
          {
            friendId: this.idFriend
          }
        ).subscribe( data => {
          const confirmationObject = {name: "", id: "", display: false};
          this.feedService.deleteFriendSubject.next(this.idFriend);
          this.feedService.fetchAllPlaces().subscribe(data => {
            this.feedService.placeSubject.next(data)
            this.feedService.displayConfirmationFriendSubject.next(confirmationObject)
          })
        })
      }
      else if(this.addressConfirmation !== undefined && this.addressConfirmation !== "") {
        console.log(this.addressConfirmation)
        this.feedService.addAdresses(this.addressConfirmation).subscribe(data1 => {
              this.feedService.fetchAllAddresses().subscribe((data2) => {
                const addAddressObject = {adresses: data2, inputAddressValue: this.addressConfirmation};
                this.feedService.addAddressSubject.next(addAddressObject)

  
                // sendback the false display to hide the confirm dialog and reset the type value
                // if we don't reset ("") our else if won't works anymore if we kept adding type and address
                const confirmationObject2 = {address: "", display: false};
                this.feedService.displayConfirmationAddressSubject.next(confirmationObject2);


              });
            })
      }
      else if(this.typeConfirmation !== undefined && this.typeConfirmation !== ""){        
        this.feedService.addTypes(this.typeConfirmation).subscribe(data1 => {
          this.feedService.fetchAllTypes().subscribe((data2) => {

            // indicate to the address element that we have retrieve de data so that pass the data
            const addTypeObject = {types: data2, inputTypeValue: this.typeConfirmation};
            this.feedService.addTypeSubject.next(addTypeObject)


            // sendback the false display to hide the confirm dialog and reset the type value
            const confirmationObject3 = {type: "", display: false};
            this.feedService.displayConfirmationTypeSubject.next(confirmationObject3);

          });
        })
      }
      else if(this.idPlace !== undefined && this.idPlace !== "") {
        this.http.delete(environment.apiUrl + '/places/' + this.idPlace).subscribe(data3 => {
                this.feedService.deletePlaceSubject.next(this.idPlace);

                // sendback the false display to hide the confirm dialog and reset the type value
                // if we don't reset ("") our else if won't works anymore if we kept adding type and address
                const confirmationObject4 = {name: "", id: "", display: false};
                this.feedService.displayConfirmationDeletePlaceSubject.next(confirmationObject4);
            })
      }
    }

  onReject(){
    if (this.idFriend !== undefined && this.idFriend !== "") {
      const confirmationObject = {name: "", id: "", display: false};
      this.feedService.displayConfirmationFriendSubject.next(confirmationObject)
    }
    else if(this.addressConfirmation !== undefined && this.addressConfirmation !== "") {
      this.feedService.notAddAddressSubject.next({});

      // hide confirm dialog
      const confirmationObject2 = {address: "", display: false};
      this.feedService.displayConfirmationAddressSubject.next(confirmationObject2);
    }
    else if(this.typeConfirmation !== undefined && this.typeConfirmation !== ""){
      this.feedService.notAddTypeSubject.next({});

      // hide confirm dialog
      const confirmationObject3 = {type: "", display: false};
      this.feedService.displayConfirmationTypeSubject.next(confirmationObject3);
    }
    else if(this.idPlace !== undefined && this.idPlace !== ""){
      // hide confirm dialog
      const confirmationObject4 = {name: "", id: "", display: false};
      this.feedService.displayConfirmationDeletePlaceSubject.next(confirmationObject4);
    }
    
  }
}
