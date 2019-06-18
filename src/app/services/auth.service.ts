import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userDetails=null
  constructor(public FirebaseAuth:AngularFireAuth) {
    this.FirebaseAuth.authState.subscribe(user=>{
      if(user){
        this.userDetails=user
      }
    })
  }

  logIn(email,password){
    this.FirebaseAuth.auth.signInWithEmailAndPassword(email,password).then(data=>{
    console.log(data)
    }).catch(err=>{
     console.log(err)
    })
  }

  signUp(email,password){
    this.FirebaseAuth.auth.createUserWithEmailAndPassword(email,password).then(data=>{
      console.log(data)
    }).catch(err=>{
      console.log(err)
    })
  }

  isAuthenticated(){
    if(this.userDetails){
      return true;
    }
    else
      return false;
  }
}
