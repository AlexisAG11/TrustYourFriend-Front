import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { FeedService } from '../feed/feed.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {

  selectedFile:any;
  types: any[] = [];
  adresses: any[] = [];
  filteredAddress: string[] = [];
  filteredType: string[] = [];
  inputAddressValue: string = "";
  inputTypeValue: string = "";

  keyInputAddress: boolean = false; // monitore when we key input on the input address
  keyInputType: boolean = false; // monitore when we key input on the input address


  constructor(private http: HttpClient, private router: Router, private feedService: FeedService){}

  ngOnInit(): void {
    this.feedService.fetchAllTypes().subscribe((data) => {
      this.types = data;
    });
    this.feedService.fetchAllAddresses().subscribe((data) => {
      this.adresses = data;
    });

  }

  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
  }

  onSubmitAddress(form: NgForm){
    const name = form.value.name;
    const type = form.value.selectedType;
    const address = form.value.selectedAddress;
    const comment = form.value.comment;
    const fd = new FormData();
    if (this.selectedFile) {
      fd.append('image', this.selectedFile);
    }
    fd.append('name', name);
    fd.append('type', type);
    fd.append('address', address);
    fd.append('comment', comment);
    this.http.post(environment.apiUrl + '/places', fd).subscribe(res => {
      this.router.navigate(['/feed']);
    })
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
  
    let foundType = false;
    this.filteredType = [];

    if(value.length === 0){
      return
    }
    this.types.forEach((ele)=> {
      if (ele['name'].substr(0, value.length).toLowerCase() === value.toLowerCase()) {
        this.filteredType.push(ele['name']);
        foundType = true;
      }
    })
    if (foundType === false) {
      this.filteredType.push(value + ' (ajouter type)');
    }
  }

  onAddressClick(adress: any){
    this.keyInputAddress = false
    if (adress.includes("ajouter ville")) {
      const adressRaw = adress.replace(' (ajouter ville)','');
      if (confirm("Etes vous sûr de vouloir ajouter la ville : " + adressRaw)) {
        this.feedService.addAdresses(adressRaw).subscribe(data1 => {
          this.feedService.fetchAllAddresses().subscribe((data2) => {
            this.adresses = data2;
            this.filteredAddress = [];
            this.inputAddressValue = adressRaw;
            console.log(adressRaw + ' bien ajoutée');
          });
        })
      } else {
        this.filteredAddress = [];
        this.inputAddressValue = "";
      }
    }
    else {
      this.filteredAddress = [];
      this.inputAddressValue = adress;
    }
  }

  onTypeClick(type: any){
    this.keyInputType = false
    if (type.includes("ajouter type")) {
      const typeRaw = type.replace(' (ajouter type)','');
      if (confirm("Etes vous sûr de vouloir ajouter le type : " + typeRaw)) {
        this.feedService.addTypes(typeRaw).subscribe(data1 => {
          this.feedService.fetchAllTypes().subscribe((data2) => {
            this.types = data2;
            this.filteredType = [];
            this.inputTypeValue = typeRaw;
            console.log(typeRaw + ' bien ajoutée');
          });
        })
      } else {
        this.filteredType = [];
        this.inputTypeValue = "";
      }
    }
    else {
      this.filteredType = [];
      this.inputTypeValue = type;
    }
  }

  onInputAdressBlur(event:any, container:any){
    const clickedElement = event.relatedTarget as HTMLElement;
    if (!container.contains(clickedElement) && this.keyInputAddress) {
      // Reset input value only if clicked outside the container input field and and don't click (keyinputAdress false)
      // on the suggestion dropdown
      this.inputAddressValue = "";
      this.filteredAddress = [];
    }
  }

  onInputTypeBlur(event:any, container:any){
    const clickedElement = event.relatedTarget as HTMLElement;
    if (!container.contains(clickedElement) && this.keyInputType) {
      // Reset input value only if clicked outside the container input field and and don't click (keyinputAdress false)
      // on the suggestion dropdown
      this.inputTypeValue = "";
      this.filteredType = [];
    }
  }
}
