import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { EnquiryService } from 'src/app/services/enquiry.service';
import { NgForm } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-singleproperty',
  templateUrl: './singleproperty.component.html',
  styleUrls: ['./singleproperty.component.css']
})
export class SinglepropertyComponent implements OnInit {

  @Input('property') property
  image:any
  showForm:boolean=false
  msg
  loggedIn: boolean;
  constructor(public authService:AuthService, public enquiryService:EnquiryService,public storage:AngularFireStorage) { }

  ngOnInit() {
    this.image = this.storage.ref(this.property.image).getDownloadURL()
    this.loggedIn = this.authService.isAuthenticated();
  }

  sendEnquiry(enquiryForm:NgForm){
    if(this.loggedIn) {
      let title = this.property.title
      let propertyId = this.property.id
      let ownerEmail = this.property.ownerEmail
      let timestamp = new Date()
      let email = this.authService.userDetails.email
      let valid:boolean = false
      this.enquiryService.addEnquiry({valid,timestamp,propertyId,ownerEmail,email,title,...enquiryForm.value}).then(data=>{
      enquiryForm.reset()
      document.getElementById("alert").style.display="block"
      setTimeout(() => {
        document.getElementById("alert").style.display="none"
      }, 4000);
      this.showForm=false
      }).catch(err=>{
        this.msg = err.message
        document.getElementById("erralert").style.display="block"
        setTimeout(() => {
          document.getElementById("erralert").style.display="none"
        }, 4000);
      })
    }
    else {
      document.getElementById("loginalert").style.display="block"
      setTimeout(() => {
        document.getElementById("loginalert").style.display="none"
      }, 4000);
    }
  }

  close(){
    document.getElementById("alert").style.display="none"
    document.getElementById("erralert").style.display="none"      
  }
}
