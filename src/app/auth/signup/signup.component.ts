import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { __await } from 'tslib';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public auth:AuthService) { }

  ngOnInit() {
  }

  signup(signupForm:NgForm){
    console.log(signupForm.value)
    //code to sign up using firebase auth
    this.auth.signUp(signupForm)
  }
  
  close(){
    document.getElementById('alert').style.display="none"
  }
}