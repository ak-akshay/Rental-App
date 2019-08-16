import { Component, OnInit } from '@angular/core';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  properties=[]
  constructor( public rentalService:RentalService) {   }

  ngOnInit() {
    this.getAllProperties()
  }

  getAllProperties(){
    this.rentalService.getAllRentals().subscribe(res=>{
      this.properties = res.slice(0,5)
    })
  }

}
