import { animate, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0}), // Initial style
        animate('0.2s', style({ opacity: 1})) // Animation
      ]),
      transition(':leave', [
        animate('0.1s', style({ opacity: 0,}))
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
  editMode:boolean = false;

  constructor(private http: HttpClient){}

  ngOnInit(): void {
  }

  onDeleteAddress(name: string, id: string) {
    if(confirm("Etes vous sûr de vouloir supprimer " + name)) {
      this.http.delete(environment.apiUrl + '/places/' + id).subscribe( data => {
        console.log(name + ' bien supprimer')
        const inde = this.places.indexOf(this.place);
        if (inde !== -1) {
          this.places.splice(inde, 1);
        }
        console.log(this.places)
      })
    }
  }

  onEditAddress(){
    this.editMode = true;
  }

  EditPost(form: NgForm){
    
  }

  onUnvalidation(){
    this.editMode = false;
  }

}
