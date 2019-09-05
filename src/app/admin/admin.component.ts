import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RentalService } from '../services/rental.service';
import { EnquiryService } from '../services/enquiry.service';

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
  constructor(private AuthService:AuthService, private RentalService: RentalService, private EnquiryService: EnquiryService) {}

  ngOnInit() {
  }

  getAllUsers(){
    this.show="users";
    this.AuthService.getUsers().subscribe(res=>{
      this.users = res
      console.log(this.users)
    })
  }

  getAllRentals(){
    this.show="rentals";
    this.RentalService.getAllRentals().subscribe(res=>{
      this.rentals = res
      console.log(this.rentals)
    })
  }

  getAllEnquiries(){
    this.show="enquiries";
    this.EnquiryService.getAllEnquiries().subscribe(res=>{
      this.enquiries = res
      console.log(this.enquiries)
    })
  }
}
