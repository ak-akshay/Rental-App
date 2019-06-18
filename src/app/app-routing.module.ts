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

const routes: Routes = [
  {path: 'allproperties' , component:RentalsComponent, canActivate:[AuthguardService]},
  {path: 'addproperty' , component:AddrentalComponent, canActivate:[AuthguardService]},
  {path: 'home' , component:HomeComponent , canActivate:[AuthguardService]},
  {path: '' , component:HomeComponent , canActivate:[AuthguardService]},
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
