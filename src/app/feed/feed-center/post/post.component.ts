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
  placeBeforeEdit:any[] = [];

  // for edit mode order list
  types: any[] = [];
  adresses: any[] = [];
  filteredAddress: string[] = [];
  filteredType: string[] = [];
  inputAddressValue: string = "";
  inputTypeValue: string = "";
  keyInputAddress: boolean = false; // monitore when we key input on the input address
  keyInputType: boolean = false; // monitore when we key input on the input address

  constructor(private http: HttpClient, private feedService: FeedService){}

  ngOnInit(): void {
    this.urlImage = this.place.imageUrl;
    this.feedService.fetchAllTypes().subscribe((data) => {
      this.types = data;
    });
    this.feedService.fetchAllAddresses().subscribe((data) => {
      this.adresses = data;
    });
  }

  onDeleteAddress(name: string, id: string) {
    const confirmationObject = {name: name, id: id, display: true};
    this.feedService.displayConfirmationDeletePlaceSubject.next(confirmationObject);
  }

  onEditAddress(){
    this.editMode = true;
    this.placeBeforeEdit = {...this.place};
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
    console.log(id);
    this.http.patch(environment.apiUrl + '/places/' + id, fd).subscribe(res => {
        this.editMode = false; 
    })
  }

  onUnvalidation(){
    this.editMode = false;
    this.place = this.placeBeforeEdit;
  }

  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
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

  onInputAdress(event : any){
    this.keyInputAddress = true;
    const valueRaw = event.target.value.toLowerCase();
    const value = valueRaw.charAt(0).toUpperCase() + valueRaw.slice(1);
  
    let foundAddress = false;
    this.filteredAddress = [];

    if(value.length === 0){
      return
    }
    this.adresses.forEach((ele)=> {
      if (ele['name'].substr(0, value.length).toLowerCase() === value.toLowerCase()) {
        this.filteredAddress.push(ele['name']);
        foundAddress = true;
      }
    })
    if (foundAddress === false) {
      this.filteredAddress.push(value + ' (ajouter ville)');
    }
  }

  onInputType(event : any){
    this.keyInputType = true;
    const valueRaw = event.target.value.toLowerCase();
    const value = valueRaw.charAt(0).toUpperCase() + valueRaw.slice(1);
    console.log(this.types);
    this.filteredType = [];

    if(value.length === 0){
      return
    }
    this.types.forEach((ele)=> {
      if (ele['name'].substr(0, value.length).toLowerCase() === value.toLowerCase()) {
        this.filteredType.push(ele['name']);
      }
    })
  }

  onAddressClick(adress: any){
    this.keyInputAddress = false;
    this.filteredAddress = [];
    this.place.address = adress;
    
  }

  onTypeClick(type: any){
    this.keyInputType = false
    this.filteredType = [];
    this.place.type = type;
  }

  onInputAdressBlur(event:any, container:any){
    const clickedElement = event.relatedTarget as HTMLElement;
    if (!container.contains(clickedElement) && this.keyInputAddress) {
      // Reset input value only if clicked outside the container input field and and don't click (keyinputAdress false)
      // on the suggestion dropdown
      this.place.address = "";
      this.filteredAddress = [];
    }
  }

  onInputTypeBlur(event:any, container:any){
    const clickedElement = event.relatedTarget as HTMLElement;
    if (!container.contains(clickedElement) && this.keyInputType) {
      // Reset input value only if clicked outside the container input field and and don't click (keyinputAdress false)
      // on the suggestion dropdown
      this.place.type = "";
      this.filteredType = [];
    }
  }

}
