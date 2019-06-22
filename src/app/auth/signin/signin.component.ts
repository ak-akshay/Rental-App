import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(public auth:AuthService) { }
 
  ngOnInit() {
  }

  signin(signinForm:NgForm){
    //Code to sign in using firebase auth
    this.auth.logIn(signinForm.value.email,signinForm.value.password)
  }

  close(){
    document.getElementById('alert').style.display="none"
  }
}
