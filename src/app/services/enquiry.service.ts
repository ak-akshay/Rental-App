import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnquiryService {

  constructor(public db:AngularFirestore,public authService:AuthService) { }
 
  addEnquiry(enquiry){
    return this.db.collection('enquiries').add(enquiry)
  }

  getEnquiries(){
    return this.db.collection('enquiries',ref=>ref.where('ownerEmail','==',this.authService.userDetails.email).where('valid','==','true')).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    ); 
  }

  deleteEnquiry(id){
    this.db.collection('enquiries').doc(id).delete().then(() => {
      console.log("Deleted")
    }).catch(err => {
      console.log(err)
    })
  }
}
