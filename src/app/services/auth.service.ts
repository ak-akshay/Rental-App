import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userid
  userDetails=null
  errmsg
  constructor(public db:AngularFirestore,public FirebaseAuth:AngularFireAuth,public router:Router) {
    this.FirebaseAuth.authState.subscribe(user=>{
      if(user){
        this.userDetails=user
      }
    })
  }

  logIn(email,password){
    this.FirebaseAuth.auth.signInWithEmailAndPassword(email,password).then(data=>{
      this.userid = data.user.uid
      this.getUserInfo().subscribe(info=>{
        this.userDetails = info.data()
      })
      console.log(data)
      console.log(this.getUserInfo())
      this.router.navigateByUrl('/home')
    }).catch(err=>{
      this.errmsg=err.message
      document.getElementById('alert').style.display="block"
    })
  }

  signUp(userD){
    let email = userD.value.email
    let password = userD.value.password
    let name = userD.value.name
    let dob = userD.value.dob
    let mobile = userD.value.mobile
    this.FirebaseAuth.auth.createUserWithEmailAndPassword(email,password).then(data=>{
      console.log(data)
      this.userid=data.user.uid
      this.addUser({email,name,mobile,dob})
      this.router.navigateByUrl('/auth/signin')
    }).catch(err=>{
      document.getElementById('alert').style.display="block"
      console.log(err)
      this.errmsg=err.message
    })
  }

  addUser(user){
    //return this.db.collection('users').add(user)
    return this.db.collection('users').doc(this.userid).set(user);
  }

  isAuthenticated(){
    if(this.userDetails){
      return true;
    }
    else
      return false;
  }

  getUserInfo(){
    //return this.userDetails.user
    return this.db.collection('users').doc(this.userid).get()
  }
}