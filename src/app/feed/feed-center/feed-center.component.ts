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
  inFiltering: boolean = false;
  allImageLoaded: boolean = true;
  temporaryPlaces: any = [];


  constructor(private feedService: FeedService, private authService: AuthentificationService){}

  ngOnInit(): void {
    this.sub2 = this.feedService.placeSubject.subscribe( data => {
      // to replace the data only when everything of the new data is loaded (images)
      this.temporaryPlaces = data.modifiedPlaces;
      // case if there isn't any data
      if (this.temporaryPlaces.length === 0) {
        this.allImageLoaded = true;
        this.places = this.temporaryPlaces;
      }
      else {
        // preload images
        this.checkImages();
      }
    })

    this.feedService.deletePlaceSubject.subscribe((id) => {
      this.places = this.places.filter((ele:any) => ele._id != id);

    })

    this.feedService.inFilteringSubject.subscribe( data => {
      this.inFiltering = data;
      this.allImageLoaded = false;

    })

  }

  checkImages() {
    // Get all image URLs from the new data (adjust based on your data structure)
    const imageUrls = this.temporaryPlaces.map((item: any) => item.imageUrl);
    const totalImages = imageUrls.length;
    let loadedImages = 0;

    // Create an Image element for each image URL to preload them
    imageUrls.forEach((url:any) => {
      const img = new Image();
      
      img.onload = () => {
        loadedImages++;
        // Check if all images are loaded
        if (loadedImages === totalImages) {
          this.allImageLoaded = true;
          this.places = this.temporaryPlaces;
        }
      };
      
      img.onerror = () => {
        loadedImages++;
        // Check if all images are loaded (consider errors too)
        if (loadedImages === totalImages) {
          this.allImageLoaded = true;
          this.places = this.temporaryPlaces;
        }
      };
      img.src = url; // Start loading the image
    });
  }




  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }

}
