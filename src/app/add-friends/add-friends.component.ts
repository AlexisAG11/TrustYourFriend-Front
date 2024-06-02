import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-friends',
  templateUrl: './add-friends.component.html',
  styleUrls: ['./add-friends.component.css']
})
export class AddFriendsComponent {

  constructor(private http: HttpClient, private router: Router){}

  errorMsg: string = "";
  isError : boolean = false;

  onSubmitFriends(form: NgForm){
    const email = form.value.email;
    this.http.patch(environment.apiUrl + '/friends/request', 
      {
        friendEmail: email
      }
    ).subscribe(res => {
      this.router.navigate(['/feed']);
    },
    error => {
      this.isError = true;
      this.errorMsg = error.error.msg;
      setTimeout(() => {
        this.isError = false;
      }, 2000)
    })
  }

}
