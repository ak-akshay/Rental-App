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
  
  constructor(private modalService: NgbModal,public rentalService:RentalService,private authService:AuthService, private storage:AngularFireStorage) { }

  ngOnInit() {
    this.getMyProperties()
  }

  getMyProperties(){
    this.curr_user=this.authService.userDetails.email
    this.rentalService.getMyRentals(this.curr_user).subscribe(res=>{
      this.properties = res
    })
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(() => {  });
  }

  deleteProperty(property){
    this.selectedProperty = property
    console.log(this.selectedProperty)
  }

  confirmDelete(){
    console.log(this.selectedProperty.id)
    // Create a reference to the file to delete
    // Points to the root reference
    var storageRef = this.storage.ref('')
    // Points to 'image'
    var rentalsImageRef = storageRef.child(this.selectedProperty.image);
    // Delete property
    this.rentalService.delete(this.selectedProperty.id)
    // Delete the file
    rentalsImageRef.delete();
  }

  editProperty(property){
    this.edit=true
    this.selectedProperty = property
  }
}
