import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RentalService } from 'src/app/services/rental.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-addrental',
  templateUrl: './addrental.component.html',
  styleUrls: ['./addrental.component.css']
})
export class AddrentalComponent implements OnInit {

  isPropertyAdded:boolean=false
  path
  isUploaded:boolean=false
  constructor(public rentalService:RentalService,public router:Router,public authService:AuthService,private storage: AngularFireStorage) { }

  ngOnInit() {
  }
  addproperty(addrentalform:NgForm){
    console.log(addrentalform.value)
    let ownerEmail = this.authService.userDetails.email
    let ownerName = this.authService.userDetails.name
    let ownerContact = this.authService.userDetails.mobile
    let image = this.path
    this.rentalService.addRental({ownerEmail,image,ownerName,ownerContact,...addrentalform.value}).then(data=>{
      console.log(data.id)
      addrentalform.reset()
      this.isPropertyAdded=true
    }).catch(err=>{
      console.log(err)
    })
  }

  SelectFile(event){
    let file = event.target.files[0]
    let date = new Date()
    let unique = '/rentals/'+ date.toString()
    let task = this.storage.upload(unique,file).then(data=>{
      console.log(data)
      this.path=unique
      this.isUploaded=true
    }).catch(err=>{
      console.log(err)
    })
  }
}
