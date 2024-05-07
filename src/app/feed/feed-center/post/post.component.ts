import { animate, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { FeedService } from '../../feed.service';

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
  selectedFile:any
  urlImage: any;

  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.urlImage = 'http://localhost:3000/uploads/'+ this.place.image
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

  EditPost(form: NgForm, id: string){
    const name = form.value.name;
    const type = form.value.type;
    const address = form.value.address;
    const comment = form.value.comment;
    const fd = new FormData();
    if (this.selectedFile) {
      fd.append('image', this.selectedFile);
    }
    fd.append('name', name);
    fd.append('type', type);
    fd.append('address', address);
    fd.append('comment', comment);
    console.log("modified");
    this.http.patch(environment.apiUrl + '/places/' + id, fd).subscribe(res => {
        this.editMode = false; 
    })
  }

  onUnvalidation(){
    this.editMode = false;
  }

  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
    console.log(event)
    const files = event.target.files;
    if (files.length === 0)
        return;

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
        return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
        this.urlImage = reader.result;
    }
  }

}
