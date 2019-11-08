import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  signedin:boolean=false
  userName
  gradient:boolean = false
  home:boolean=true

  constructor(public authService:AuthService, public router:Router) { }

  
  @HostListener("window:scroll", [])
  onWindowScroll() {
    var navbar = document.getElementById('navbar');
      var fromTopPx = 40; // distance to trigger
      var scrolledFromtop = window.scrollY;
      if(scrolledFromtop > fromTopPx){
          this.gradient=true;
        }else if(this.gradient && scrolledFromtop < fromTopPx){
          this.gradient=false
        }
  }

  @HostListener("window:click",[])
  onWindowClick(){
    if(this.router.url==='/home')
      {
        this.home=true
      }else {
        this.home=false
      }
  }

  ngOnInit() {
    if(this.authService.isAuthenticated())
    this.signedin=true
  }

  ngAfterViewInit(){
    setTimeout( ()=>{
      if(this.authService.isAuthenticated())
      this.getUserName()
    }, 1500)
    setTimeout( ()=>{
      if(this.authService.isAuthenticated())
      this.getUserName()
    }, 3000)
  }
  
  getUserName(){
    this.userName=this.authService.userDetails.name
    console.log(this.userName)
  }

  signOut(){
    this.authService.logOut();
    console.log("signed out.")
  }
}
