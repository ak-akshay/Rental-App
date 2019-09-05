import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { RentalsComponent } from './home/rentals/rentals.component';
import { AddrentalComponent } from './home/addrental/addrental.component';
import { ErrorComponent } from './error/error.component';
import { SinglepropertyComponent } from './home/rentals/singleproperty/singleproperty.component';
import { EnquiriesComponent } from './enquiries/enquiries.component';
import { IndexComponent } from './home/index/index.component';
import { MypropertiesComponent } from './home/rentals/myproperties/myproperties.component';
import { EditpropertiesComponent } from './home/rentals/myproperties/editproperties/editproperties.component';
import { FooterComponent } from './home/footer/footer.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SigninComponent,
    SignupComponent,
    HomeComponent,
    RentalsComponent,
    AddrentalComponent,
    ErrorComponent,
    SinglepropertyComponent,
    EnquiriesComponent,
    IndexComponent,
    MypropertiesComponent,
    EditpropertiesComponent,
    FooterComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
