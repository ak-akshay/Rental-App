import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  constructor(private db:AngularFirestore) { }

  addRental(rental){
    let createdOn = new Date()
    return this.db.collection('rentals').add({createdOn,...rental})
  }

  getAllRentals(){
    return this.db.collection('rentals').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    ); 
  }

  getOrderedRentals(by){
    return this.db.collection('rentals',ref=>ref.orderBy('price',by)).snapshotChanges().pipe(
      map(actions => actions.map(a=>{
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    )
  }

  getByCity(loc){
    return this.db.collection('rentals',ref=>ref.where('city','==',loc)).snapshotChanges().pipe(
      map(actions => actions.map(a=>{
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    )
  }

  getMyRentals(owner){
    return this.db.collection('rentals',ref=>ref.where('ownerEmail','==',owner)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    ); 
  }

  update(property){
    console.log(property)
    this.db.collection('rentals').doc(property.id).update(property)
  }

  delete(id){
    this.db.collection('rentals').doc(id).delete()
  }
}
