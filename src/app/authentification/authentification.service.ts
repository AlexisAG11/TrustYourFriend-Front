import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from './user.model';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {    
    return this.http.post<any>(environment.apiUrl + '/auth/login', 
      {
        email: email,
        password: password,
      }
    ).pipe(catchError(this.handleError), tap(data => {
      this.handleAuthentification(data.user.name, data.token);
    }));
  }

  register(name:string, email: string, password: string) {    
    return this.http.post<any>(environment.apiUrl + '/auth/register', 
      {
        name: name,
        email: email,
        password: password,
      }
    ).pipe(catchError(this.handleError), tap(data => {
      this.handleAuthentification(data.user.name, data.token);
    }));
  }

  private handleError(errorRes: HttpErrorResponse){
    // return throwError(errorRes.error.msg);
    return throwError(() => errorRes.error.msg);
  }

  autoLogin(){
    interface UserData {
      name: string;
      _token: string;
    }
    
    // Retrieve the item from localStorage
    const userDataJson = localStorage.getItem('userData');
    // Use a type guard to ensure we only parse if the item is not null
    let userData: UserData | null = null;
    if (userDataJson) {
      userData = JSON.parse(userDataJson) as UserData;
    }
    if (!userData) {
      return;
    }

    const loadedUser = new User(userData.name, userData._token);
    if (loadedUser.token) {
        this.user.next(loadedUser);
    }
}

  private handleAuthentification(name: string, token: string){
    const user = new User(name, token);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user))
  }


  deleteLocalStorage(){
    localStorage.removeItem('userData');
  }
}
