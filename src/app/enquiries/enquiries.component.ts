import { Component, OnInit } from '@angular/core';
import { EnquiryService } from '../services/enquiry.service';

@Component({
  selector: 'app-enquiries',
  templateUrl: './enquiries.component.html',
  styleUrls: ['./enquiries.component.css']
})
export class EnquiriesComponent implements OnInit {

  enquiries=[]
  deleteMode:boolean=false
  toDelete=[]
  constructor(public enquiryService:EnquiryService) { }

  ngOnInit() {
    this.getEnquiries()
  }

  getEnquiries(){
    this.enquiryService.getEnquiries().subscribe(res=>{
      this.enquiries = res
      if(this.enquiries.length!=0){
      }
      console.log(this.enquiries)
    })
  }

  checkboxChanged(event,value){
    if(event.target.checked){
     this.toDelete.push(value)
    }
    if(!event.target.checked){
      let index = this.toDelete.indexOf(value);
      if(index > -1)
        {this.toDelete.splice(index,1)}
    }
  }

  cancelDelete(){
    this.toDelete=[]
  }
  
  confirmDelete(){
    let index= this.toDelete.length - 1
    while(index > -1)
    {
      this.enquiryService.deleteEnquiry(this.toDelete[index])
      index--;
    }
    this.toDelete=[]
  }
}
