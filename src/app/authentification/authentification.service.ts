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
      this.handleAuthentification(data.name, data.token);
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
      this.handleAuthentification(data.name, data.token);
    }));
  }

  private handleError(errorRes: HttpErrorResponse){
    // return throwError(errorRes.error.msg);
    return throwError(() => errorRes.error.msg);
  }

  private handleAuthentification(name: string, token: string){
    const user = new User(name, token);
    this.user.next(user);
  }

  setLocalStorage(token: string) {
    localStorage.setItem('token', token);
  }

  getLocalStorage(){
    return localStorage.getItem('token');
  }

  deleteLocalStorage(){
    localStorage.removeItem('token');
  }
}
