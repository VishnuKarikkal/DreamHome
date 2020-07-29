import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupUserComponent } from './signup-user/signup-user.component';
import { LoginuserComponent } from './loginuser/loginuser.component';
import {SignupPartnerComponent} from './signup-partner/signup-partner.component';
import {LoginPartnerComponent} from './login-partner/login-partner.component';
import {UserprofileComponent} from './userprofile/userprofile.component';
import {PartnerprofileComponent} from './partnerprofile/partnerprofile.component';  
import {UpdatepartnerComponent} from './updatepartner/updatepartner.component';
import {UpdateuserComponent} from './updateuser/updateuser.component';
import {ServicesComponent} from './services/services.component';
import {SearchComponent} from './search/search.component';
import {HomeComponent} from './home/home.component';
import {UsercontrolComponent} from './usercontrol/usercontrol.component';
import {AuthGuard} from './auth.guard';
const routes: Routes = [
  {
    path:'',component:HomeComponent
  },
  {
    path:'signupUser',component:SignupUserComponent
  },
  {
    path:'loginUser',component:LoginuserComponent
  },
  {
    path:'signupPartner',component:SignupPartnerComponent
  },
  {
    path:'loginPartner',component:LoginPartnerComponent
  },
  {
    path:'userProfile',component:UserprofileComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'userControl',component:UsercontrolComponent
  },
  {
    path:'partnerProfile',component:PartnerprofileComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'updatePartner',component:UpdatepartnerComponent
  },
  {
    path:'updateUser',component:UpdateuserComponent
  },
  {
    path:'services',component:ServicesComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'search/:search',component:SearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
