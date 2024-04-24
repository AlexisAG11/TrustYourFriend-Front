import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent {

  selectedFile:any;

  constructor(private http: HttpClient, private router: Router){}

  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
    console.log(event)
  }

  onSubmitAddress(form: NgForm){
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
    console.log("Address Add");
    this.http.post(environment.apiUrl + '/places', fd).subscribe(res => {
      this.router.navigate(['/feed']);
  })
    
  }
}
