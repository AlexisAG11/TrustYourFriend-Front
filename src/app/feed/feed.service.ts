import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  private places = [];
  placeSubject = new Subject<any>();

  constructor(private http: HttpClient) { } 

  fetchAllPlaces(queryparams: HttpParams = new HttpParams()){
      console.log(queryparams);
      return this.http.get<any>(environment.apiUrl + '/places', { params: queryparams }).pipe(tap( data => {
        this.places = data.places;
      }));
  }

  getRecipe(){
    return this.places.slice();
  }

  fetchAllFriend(){
    return this.http.get<any>(environment.apiUrl + '/friends');
  }
}
