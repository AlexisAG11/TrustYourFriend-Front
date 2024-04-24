import { animate, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  animations: [
    trigger('fadeOut', [
      transition(':leave', [
        animate('0.3s', style({ 
          opacity: 0,
          height: 0,
          marginBottom: 0 }))
      ])
    ])
  ]
})
export class PostComponent implements OnInit{

  @Input() place: any;
  @Input() places: any;
  @Input() idUser: any;
  @Input() index: number = 0;
  deletePlace: boolean = false;

  constructor(private http: HttpClient){}

  ngOnInit(): void {
  }

  onDeleteAddress(name: string, id: string) {
    if(confirm("Etes vous sûr de vouloir supprimer " + name)) {
      this.http.delete(environment.apiUrl + '/places/' + id).subscribe( data => {
        console.log(name + ' bien supprimer')
        this.deletePlace = true;
        console.log(this.places)
      })
    }
  }

}
