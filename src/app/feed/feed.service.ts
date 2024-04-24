import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  private places = [];

  constructor(private http: HttpClient) { } 

  fetchAllPlaces(){
    return this.http.get<any>(environment.apiUrl + '/places').pipe(tap( data => {
      this.places = data.places;
    }));
  }

  getRecipe(){
    return this.places.slice();
  }
}
