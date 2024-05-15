import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  private places = [];
  placeSubject = new Subject<any>();
  friendSubject = new Subject<any>();
  types = [
    {name: "Italien", checkboxFilled: false},
    {name: "Japonais", checkboxFilled: false},
    {name: "Coréen", checkboxFilled: false},
    {name: "Libanais", checkboxFilled: false},
    {name: "Français", checkboxFilled: false},
    {name: "Brunch", checkboxFilled: false},
    {name: "Bar", checkboxFilled: false},
    {name: "Autre", checkboxFilled: false},
  ];

  constructor(private http: HttpClient) { } 

  fetchAllPlaces(queryparams: HttpParams = new HttpParams()){
      console.log(queryparams);
      return this.http.get<any>(environment.apiUrl + '/places', { params: queryparams }).pipe(tap( data => {
        this.places = data.places;
      }));
  }

  fetchAllFriends(){
    return this.http.get<any>(environment.apiUrl + '/friends').pipe(
      map(data => {
        data.friends.sort((a:any, b:any) => a.name.localeCompare(b.name));
        return data
      })
    );
  }

  getTypes(){
    return this.types.slice();
  }

  fetchAllAddresses(){
     return this.http.get<any>(environment.apiUrl + '/addresses').pipe(
      map(data => {
      data.addresses.sort((a:any, b:any) => a.name.localeCompare(b.name));
      return data.addresses.map((ele:any) => {
        return {name: ele.name, checkboxFilled: ele.checkboxFilled }
      })
    }));
  }


  addAdresses(nameAddress: string){
    return this.http.post(environment.apiUrl + '/addresses/add', {
      name: nameAddress
    })
  }
}
