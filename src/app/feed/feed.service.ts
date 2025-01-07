import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Subject, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  private places = [];
  placeSubject = new Subject<any>();
  deleteFriendSubject = new Subject<any>();
  addFriendSubject = new Subject<any>();
  displayConfirmationFriendSubject = new Subject<any>();
  displayConfirmationAddressSubject = new Subject<any>();
  displayConfirmationTypeSubject = new Subject<any>();
  displayConfirmationDeletePlaceSubject = new Subject<any>();
  addAddressSubject = new Subject<any>();
  notAddAddressSubject = new Subject<any>();
  addTypeSubject = new Subject<any>();
  notAddTypeSubject = new Subject<any>();
  deletePlaceSubject = new Subject<any>();
  inFilteringSubject = new Subject<any>();
  activeDisplayFilter = new Subject<void>();

  
  constructor(private http: HttpClient) { } 

  fetchAllPlaces(queryparams: HttpParams = new HttpParams()){
      return this.http.get<any>(environment.apiUrl + '/places', { params: queryparams }).pipe(tap( data => {
        this.places = data.places;
      }));
  }

  fetchAllFriends(){
    return this.http.get<any>(environment.apiUrl + '/friends').pipe(
      map(data => {
        data.friends.push({'_id': data.userId, 'name': data.userName})
        let dataMaj = data.friends.map((ele:any) => {  
          return { _id: ele._id ,name: ele.name, checkboxFilled: false}
        })
        data.friends = [...dataMaj];
        data.friends.sort((a:any, b:any) => a.name.localeCompare(b.name));
        return data
      })
    );
  }

  fetchAllAddresses(){
     return this.http.get<any>(environment.apiUrl + '/addresses').pipe(
      map(data => {
        let dataMaj = data.addresses.map((ele:any) => {  
          return { ...ele, checkboxFilled: false, disabled: false}
        })
        dataMaj.sort((a:any, b:any) => a.name.localeCompare(b.name));
        return dataMaj.map((ele:any) => {
          return {name: ele.name, checkboxFilled: ele.checkboxFilled }
        })
    }));
  }
  fetchAllTypes(){
    return this.http.get<any>(environment.apiUrl + '/types').pipe(
      map(data => {
        let dataMaj = data.types.map((ele:any) => {  
          return { ...ele, checkboxFilled: false, disabled: false}
        })
        dataMaj.sort((a:any, b:any) => a.name.localeCompare(b.name));
        return dataMaj.map((ele:any) => {
          return {name: ele.name, checkboxFilled: ele.checkboxFilled}
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
  
  acceptFriendRequest(requestFriendId: string){
    return this.http.patch(environment.apiUrl + '/friends/acceptRequest',
    {
      requestedFriendId: requestFriendId 
    })
  }

  declineFriendRequest(requestFriendId: string){
    return this.http.patch(environment.apiUrl + '/friends/declineRequest',
    {
      requestedFriendId: requestFriendId 
    })
  }
  
  googleAddress(name: string, city: string){
    return this.http.post(environment.apiUrl + '/addresses/googleAddress', 
    {
      textQuery: name + city
    })
  }

}  