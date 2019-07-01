import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  userName:String="... "
  constructor(public authService:AuthService) {   }

  ngOnInit() {
  }

  getUserName(){
    this.userName=this.authService.userDetails.name
    console.log(this.userName)
  }

  ngAfterViewInit(){
    setTimeout( ()=>{
    this.getUserName()
      }, 1500)
    setTimeout( ()=>{
      this.getUserName()
      }, 3000)
  }

}
