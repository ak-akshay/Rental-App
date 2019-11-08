import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RentalService } from '../services/rental.service';
import { EnquiryService } from '../services/enquiry.service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users=[]
  rentals=[]
  enquiries=[]
  show="none";
  deleteMode:boolean=false
  toDelete=[]
  constructor(private AuthService:AuthService, private RentalService: RentalService, private EnquiryService: EnquiryService, private AdminService: AdminService) {}

  ngOnInit() {
  }

  getAllUsers(){
    this.show="users";
    this.AuthService.getUsers().subscribe(res=>{
      this.users = res
    })
  }

  getAllRentals(){
    this.show="rentals";
    this.RentalService.getAllRentals().subscribe(res=>{
      this.rentals = res
    })
  }

  getAllEnquiries(){
    this.show="enquiries";
    this.EnquiryService.getAllEnquiries().subscribe(res=>{
      this.enquiries = res
    })
  }

  toggle(enquiry){
    this.EnquiryService.toggleValid(enquiry.id,enquiry.valid)
  }

  checkboxChanged(event,value){
    if(event.target.checked){
     this.toDelete.push(value)
     console.log(this.toDelete)
    }
    if(!event.target.checked){
      let index = this.toDelete.indexOf(value);
      if(index > -1)
        this.toDelete.splice(index,1)
      console.log(this.toDelete)
    }
  }

  confirmDelete(table){
    let index= this.toDelete.length - 1
    while(index > -1)
    {
      this.AdminService.delete(table,this.toDelete[index])
      index--;
    }
    this.toDelete=[]
  }
}
