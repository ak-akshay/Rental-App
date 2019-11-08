import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private authService : AuthService , private router : Router, private db: AngularFirestore) {  }

  canActivate():boolean{
    if(this.authService.isAdmin()){
      return true;
    }
    else{
      this.router.navigateByUrl('/error')
      return false;
    }
  }

  delete(coll,id){
    this.db.collection(coll).doc(id).delete().then(() => {
      console.log("Deleted")
    }).catch(err => {
      console.log(err)
    })
  }
}
