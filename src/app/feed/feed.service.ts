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

  constructor(private http: HttpClient) { } 

  fetchAllPlaces(queryparams: HttpParams = new HttpParams()){
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

  fetchAllAddresses(){
     return this.http.get<any>(environment.apiUrl + '/addresses').pipe(
      map(data => {
      data.addresses.sort((a:any, b:any) => a.name.localeCompare(b.name));
      return data.addresses.map((ele:any) => {
        return {name: ele.name, checkboxFilled: ele.checkboxFilled }
      })
    }));
  }
  fetchAllTypes(){
     return this.http.get<any>(environment.apiUrl + '/types').pipe(
      map(data => {
      data.types.sort((a:any, b:any) => a.name.localeCompare(b.name));
      return data.types.map((ele:any) => {
        return {name: ele.name, checkboxFilled: ele.checkboxFilled }
      })
    }));
  }


  addAdresses(nameAddress: string){
    return this.http.post(environment.apiUrl + '/addresses/add', {
      name: nameAddress
    })
  }
  addTypes(nameType: string){
    return this.http.post(environment.apiUrl + '/types/add', {
      name: nameType
    })
  }
}
