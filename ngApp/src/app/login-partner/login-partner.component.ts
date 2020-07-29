import { Component, OnInit } from '@angular/core';
import {ReactiveFormsModule,FormBuilder,Validators} from '@angular/forms';
import { UserModel } from '../signup-user/usermodel';
import {UsersService} from '../users.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-partner',
  templateUrl: './login-partner.component.html',
  styleUrls: ['./login-partner.component.css']
})
export class LoginPartnerComponent implements OnInit {

  constructor(private usersService:UsersService,private router:Router,private formBuilder:FormBuilder) { }
  userData=new UserModel(null,null,null,null,null,null,null,null);

  loginform= this.formBuilder.group
  ({
    email:['',[Validators.pattern(/^([\w\.\-]+)@([\w\-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/)]],
    password:['',[Validators.minLength(8),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*])(?=.*[0-9])(?!.*\s).{8,}$/)]]
  })
  ngOnInit(): void {
  }
signin()
{
  console.log("sign in call");
  this.usersService.signinPartner(this.userData)
    .subscribe(
      (res:any)=>
            {             //typescript doesn't identify 'token' property in the 'res'
                                //so to avoid error, used " res:any "
       if(res=="Invalid Credentials!")
       {
        alert("Invalid Credentials!");
       }
       else
       {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/']);
       }
            },
      err=>
      {
        console.log(err);alert("Invalid Credentials!")
      }
              );
}
}
