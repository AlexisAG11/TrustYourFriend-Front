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
  showPassword: boolean = false;
  isInputPasswordFocused: boolean = false;
  isInputNameFocused: boolean = false;
  isInputEmailFocused: boolean = false;
  


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

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onFocus(info: string) {
    if (info === "password") {
      this.isInputPasswordFocused = true;
    }
    if (info === "name") {
      this.isInputNameFocused = true;
    }
    if (info === "email") {
      this.isInputEmailFocused = true;
    }
  }

  onBlur(info: string) {
    if (info === "password") {
      this.isInputPasswordFocused = false;
    }
    if (info === "name") {
      this.isInputNameFocused = false;
    }
    if (info === "email") {
      this.isInputEmailFocused = false;
    }  }
  
  ngOnDestroy(): void {
    this.authObs.unsubscribe();
  }
}
