import { Component, OnInit } from '@angular/core';
import {ReactiveFormsModule,FormBuilder,Validators} from '@angular/forms';

import {Router} from '@angular/router';
import {UsersService} from '../users.service';
import {PartnerModel} from './partnermodel';
import { flatten } from '@angular/compiler';
@Component({
  selector: 'app-signup-partner',
  templateUrl: './signup-partner.component.html',
  styleUrls: ['./signup-partner.component.css']
})
export class SignupPartnerComponent implements OnInit {
  partnerData=new PartnerModel(null,null,null,null,null,null,null);
  image:File=null;
  constructor(public usersService:UsersService,private router:Router,private formBuilder:FormBuilder) { }
  signupform= this.formBuilder.group
  ({
    name:['',[
      Validators.pattern(/^([a-zA-Z]+|[a-zA-Z]+\s{1}[a-zA-Z]{1,}|[a-zA-Z]+\s{1}[a-zA-Z]{1,}\s{1}[a-zA-Z]{1,})$/),
      Validators.required
            ]],
    phone:['',[
      Validators.pattern(/^(\d{3})\-(\d{3})\-(\d{4})$/),
      Validators.required
              ]], //xxx-xxx-xxxx
    email:['',[
      Validators.pattern(/^([\w\.\-]+)@([\w\-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/),
      Validators.required
              ]],
    district:['',[Validators.required]],
    service:['',[Validators.required]],
    password:['',[
      Validators.minLength(8),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*])(?=.*[0-9])(?!.*\s).{8,}$/),
      Validators.required
              ]]
  })
  ngOnInit(): void {
  }

  showFiles(e)
  {
      this.image=e.target.files[0];
      let fileReader=new FileReader;
      fileReader.onload=function(event)
                          {
                           let imageURL=fileReader.result;
                           document.getElementById('preview').setAttribute("src",`${imageURL}`);
                          }
      fileReader.readAsDataURL(this.image);
  }
signup()
{
let drp=document.getElementById('district');
let drpserv=document.getElementById('service');
let str=[];
 if(this.image==null)
 {
alert("Please choose a profile image!");
 }
 else
 {
  for(let i=0;i<drp['options'].length;i++)
  {
   if(drp['options'][i].selected)
   {
   str.push(drp['options'][i].value);
   }
  }
  this.partnerData.district=str;  //identifying districts selected
  str=[];
  for(let i=0;i<drpserv['options'].length;i++)
  {
   if(drpserv['options'][i].selected)
   {
   str.push(drpserv['options'][i].value);
   }
  }
this.partnerData.services=str;    //identifying services selected
let url;
this.usersService.userImage(this.image)
.subscribe((res)=>
{
url=res['url'];
this.partnerData.imageUrl=url;
this.usersService.signupPartner(this.partnerData)
.subscribe(
  (res)=>
  {
    if(res['status']=="OK!")      //checking signup status
          {
            alert("Account added!");
            this.router.navigate(['/loginPartner']);
          }
    else
          {
            alert("Please try another credentials!");
          }
    });
  
});
 }
}
}
