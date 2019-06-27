import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { RentalsComponent } from './home/rentals/rentals.component';
import { AddrentalComponent } from './home/addrental/addrental.component';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ErrorComponent } from './error/error.component';
import { AuthguardService } from './services/authguard.service';
import { EnquiriesComponent } from './enquiries/enquiries.component';
import { IndexComponent } from './home/index/index.component';
import { MypropertiesComponent } from './home/rentals/myproperties/myproperties.component';
import { EditpropertiesComponent } from './home/rentals/myproperties/editproperties/editproperties.component';

const routes: Routes = [
  {path: '' , component:HomeComponent , canActivate:[AuthguardService]},
  {path:'home' , component:HomeComponent , canActivate:[AuthguardService] , children:[
    {path:'' , component:IndexComponent},
    {path:'allproperties' , component:RentalsComponent},
    {path:'addproperty' , component:AddrentalComponent},
    {path:'enquiries' , component:EnquiriesComponent},
    {path:'myproperties' , component:MypropertiesComponent , children:[
      {path:'editproperty' , component:EditpropertiesComponent}
    ]}
  ]},
  {path: 'auth' , component:AuthComponent},
  {path: 'auth/signin' , component:SigninComponent},
  {path: 'auth/signup' , component:SignupComponent},
  {path: '**' , component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
