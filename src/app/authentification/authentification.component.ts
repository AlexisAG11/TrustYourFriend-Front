import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthentificationService } from './authentification.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css'],
})
export class AuthentificationComponent implements OnDestroy {
  isConnexion = true;
  isError = false;
  errorMess = '';
  isLoading = false;
  authObs: Subscription = new Subscription();


  constructor(
    private router: Router,
    private authService : AuthentificationService
  ){}



  connexion(form: NgForm){
    this.isConnexion = true;
    form.reset();

  }

  inscription(form: NgForm){
    this.isConnexion = false;
    form.reset();
  }

  onSubmitForm(form: NgForm){
    this.isLoading = true;
    const email = form.value.groupEmail.email;
    const password = form.value.groupPassword.password;

    if (this.isConnexion) {
      this.authObs = this.authService.login(email, password).subscribe(data => {
          this.isLoading = false;
          console.log(data);
          this.authService.setLocalStorage(data.token);
          this.router.navigate(['/feed']);
        }, errorMessage => {
          this.isLoading = false;
          this.errorMess = errorMessage;
          this.isError = true;
          setTimeout(() => {
            this.isError = false;
          }, 2000)
        })
    }else {
        const name = form.value.groupName.name;
        this.authObs = this.authService.register(name, email, password).subscribe(data => {
        this.isLoading = false;
        console.log(data);
        this.authService.setLocalStorage(data.token);
        this.router.navigate(['/feed']);
      }, errorMessage => {
        this.isLoading = false;
        this.errorMess = errorMessage;
        this.isError = true;
        setTimeout(() => {
          this.isError = false;
        }, 2000)
      })
    }
    
  }
  
  ngOnDestroy(): void {
    this.authObs.unsubscribe();
  }
}
