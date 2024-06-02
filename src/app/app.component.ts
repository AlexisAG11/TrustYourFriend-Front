import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from './authentification/authentification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tyf-angular';

  constructor(private authService: AuthentificationService){}

  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
