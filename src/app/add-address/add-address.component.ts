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
  inputAddressValue: string = "";


  constructor(private http: HttpClient, private router: Router, private feedService: FeedService){}

  ngOnInit(): void {
    this.types = this.feedService.getTypes(); 
    this.feedService.fetchAllAddresses().subscribe((data) => {
      this.adresses = data;
    });
    console.log(this.types)

  }

  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
    console.log(event)
  }

  onSubmitAddress(form: NgForm){
    const name = form.value.name;
    const type = form.value.selectedType;
    const address = form.value.address;
    const comment = form.value.comment;
    console.log(form.value);
    const fd = new FormData();
    if (this.selectedFile) {
      fd.append('image', this.selectedFile);
    }
    fd.append('name', name);
    fd.append('type', type);
    fd.append('address', address);
    fd.append('comment', comment);
    console.log("Address Add");
    this.http.post(environment.apiUrl + '/places', fd).subscribe(res => {
      this.router.navigate(['/feed']);
  })
  }
  onInputAdress(event : any){
    const valueRaw = event.target.value.toLowerCase();
    const value = valueRaw.charAt(0).toUpperCase() + valueRaw.slice(1);
  
    let foundAddress = false;
    this.filteredAddress = [];

    if(value.length === 0){
      return
    }
    this.adresses.forEach((ele)=> {
      console.log(this.filteredAddress.includes(value));
      if (ele['name'].substr(0, value.length).toLowerCase() === value.toLowerCase()) {
        this.filteredAddress.push(ele['name']);
        foundAddress = true;
      }
    })
    if (foundAddress === false) {
      this.filteredAddress.push(value + ' (ajouter ville)');
    }
    console.log(this.filteredAddress)
  }

  onAddressClick(adress: any){
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
      }
    }
    else {
      this.filteredAddress = [];
      this.inputAddressValue = adress;
    }

  }
}
