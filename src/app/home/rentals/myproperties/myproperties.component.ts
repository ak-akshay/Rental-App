import { Component, OnInit, Input } from '@angular/core';
import { RentalService } from 'src/app/services/rental.service';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-myproperties',
  templateUrl: './myproperties.component.html',
  styleUrls: ['./myproperties.component.css']
})
export class MypropertiesComponent implements OnInit {

  properties=[]
  curr_user
  selectedProperty
  edit:boolean=false
  
  constructor(private modalService: NgbModal,public rentalService:RentalService,public authService:AuthService, public storage:AngularFireStorage) { }

  ngOnInit() {
    this.getMyProperties()
  }

  getMyProperties(){
    this.curr_user=this.authService.userDetails.email
    this.rentalService.getMyRentals(this.curr_user).subscribe(res=>{
      this.properties = res
      console.log(this.properties)
    })
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(() => {  });
  }

  deleteProperty(property){
    this.selectedProperty = property
  }

  confirmDelete(){
    console.log(this.selectedProperty.id)
    this.rentalService.delete(this.selectedProperty.id)
  }

  editProperty(property){
    this.edit=true
    this.selectedProperty = property
  }
}
