import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule,FormBuilder,Validators,FormsModule} from '@angular/forms';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';

import {TokenInterceptorService} from './token-interceptor.service';
import {AuthGuard} from './auth.guard';
import {UsersService} from './users.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SignupUserComponent } from './signup-user/signup-user.component';
import { LoginuserComponent } from './loginuser/loginuser.component';
import { SignupPartnerComponent } from './signup-partner/signup-partner.component';
import { LoginPartnerComponent } from './login-partner/login-partner.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { PartnerprofileComponent } from './partnerprofile/partnerprofile.component';
import { UpdatepartnerComponent } from './updatepartner/updatepartner.component';
import { UpdateuserComponent } from './updateuser/updateuser.component';
import { ServicesComponent } from './services/services.component';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';
import { UsercontrolComponent } from './usercontrol/usercontrol.component';
import { FooterComponent } from './footer/footer.component';
import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupUserComponent,
    LoginuserComponent,
    SignupPartnerComponent,
    LoginPartnerComponent,
    UserprofileComponent,
    PartnerprofileComponent,
    UpdatepartnerComponent,
    UpdateuserComponent,
    ServicesComponent,
    SearchComponent,
    HomeComponent,
    UsercontrolComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [UsersService,AuthGuard,
  {
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
