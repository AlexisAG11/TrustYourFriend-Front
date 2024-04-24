import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed-header',
  templateUrl: './feed-header.component.html',
  styleUrls: ['./feed-header.component.css']
})
export class FeedHeaderComponent {
  constructor(private router: Router){}

  onAddAddress(){
    this.router.navigate(['add-address']);
  }
}
