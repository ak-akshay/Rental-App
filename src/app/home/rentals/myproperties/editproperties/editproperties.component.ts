import { Component, OnInit, Input } from '@angular/core';
import { RentalService } from 'src/app/services/rental.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-editproperties',
  templateUrl: './editproperties.component.html',
  styleUrls: ['./editproperties.component.css']
})
export class EditpropertiesComponent implements OnInit {

  @Input('property') property
  img:any
  success:boolean=false
  path
  isUploaded:String="none"
  constructor(public rentalService:RentalService,public storage:AngularFireStorage) { }

  ngOnInit() {
    this.img = this.storage.ref(this.property.image).getDownloadURL()
  }

  SelectFile(event){
    let file = event.target.files[0]
    let date = new Date()
    let unique = '/rentals/'+ date.toString()
    this.isUploaded="process"
    let task = this.storage.upload(unique,file).then(data=>{
      console.log(data)
      this.path=unique
      this.isUploaded="success"
    }).catch(err=>{
      console.log(err)
      this.isUploaded="fail"
    })
  }

  updateProperty(property){
    let image = this.path
    console.log(image)
    //let title = property.title
    //let price = property.price
    //let city = property.city
    //let description = property.description
    this.rentalService.update({image,...property})
    this.success=true
  }
}
