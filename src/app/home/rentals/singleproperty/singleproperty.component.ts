import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { EnquiryService } from 'src/app/services/enquiry.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-singleproperty',
  templateUrl: './singleproperty.component.html',
  styleUrls: ['./singleproperty.component.css']
})
export class SinglepropertyComponent implements OnInit {

  @Input('property') property
  showForm:boolean=false
  msg
  constructor(public authService:AuthService, public enquiryService:EnquiryService) { }

  ngOnInit() {
  }

  sendEnquiry(enquiryForm:NgForm){
    console.log(enquiryForm.value)
    let title = this.property.title
    let id = this.property.id
    let ownerEmail = this.property.ownerEmail
    let timestamp = new Date()
    let email = this.authService.userDetails.email
    this.enquiryService.addEnquiry({timestamp,id,ownerEmail,email,title,...enquiryForm.value}).then(data=>{
    enquiryForm.reset()
    document.getElementById("alert").style.display="block"
    this.showForm=false
    }).catch(err=>{
      console.log(err)
      this.msg = err.message
      document.getElementById("erralert").style.display="block"
    })
  }

  close(){
    document.getElementById("alert").style.display="none"
    document.getElementById("erralert").style.display="none"      
  }
}
