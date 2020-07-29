import { Component, OnInit } from '@angular/core';
import {ReactiveFormsModule,FormBuilder,Validators} from '@angular/forms';

import {Router} from '@angular/router';
import {UsersService} from '../users.service';
import {PartnerModel} from '../signup-partner/partnermodel';
@Component({
  selector: 'app-updatepartner',
  templateUrl: './updatepartner.component.html',
  styleUrls: ['./updatepartner.component.css']
})
export class UpdatepartnerComponent implements OnInit {
  partnerData=new PartnerModel(null,null,null,null,null,null,null);
  options="";
  constructor(public user:UsersService,private router:Router,private formBuilder:FormBuilder) { }
  signupform= this.formBuilder.group
  ({
    name:['',[
      Validators.pattern(/^([a-zA-Z]+|[a-zA-Z]+\s{1}[a-zA-Z]{1,}|[a-zA-Z]+\s{1}[a-zA-Z]{1,}\s{1}[a-zA-Z]{1,})$/),
      Validators.required
            ]],
    phone:['',[
      Validators.pattern(/^(\d{3})\-(\d{3})\-(\d{4})$/),
      Validators.required
              ]] //xxx-xxx-xxxx
  })
  ngOnInit(): void {
    this.user.getPartner().subscribe(
      (res:any)=>{             //typescript doesn't identify 'partner' object in the 'res'
                                    //so to avoid error, used " res:any "      
            this.partnerData=res.partner;
           // making the current active locations 'selected' in the dropdown list
            for(let i=0;i<this.partnerData.district.length;i++)
            {
              switch(this.partnerData.district[i])
              {
    case 'kasargod':document.getElementById('kasargod').setAttribute("selected","true");
    break;
    case 'kannur':document.getElementById('kannur').setAttribute("selected","true");
    break;
    case 'wayanad':document.getElementById('wayanad').setAttribute("selected","true");
    break;
    case 'kozhikkod':document.getElementById('kozhikkod').setAttribute("selected","true");
    break;
    case 'malappuram':document.getElementById('malappuram').setAttribute("selected","true");
    break;
    case 'palakkad':document.getElementById('palakkad').setAttribute("selected","true");
    break;
    case 'thrissur':document.getElementById('thrissur').setAttribute("selected","true");
    break;
    case 'ernakulam':document.getElementById('ernakulam').setAttribute("selected","true");
    break;
    case 'idukki':document.getElementById('idukki').setAttribute("selected","true");
    break;
    case 'kottayam':document.getElementById('kottayam').setAttribute("selected","true");
    break;
    case 'pathanamthitta':document.getElementById('pathanamthitta').setAttribute("selected","true");
    break;
    case 'alappuzha':document.getElementById('alappuzha').setAttribute("selected","true");
    break;
    case 'kollam':document.getElementById('kollam').setAttribute("selected","true");
    break;
    case 'thiruvananthapuram':document.getElementById('thiruvananthapuram').setAttribute("selected","true");
    break;
              }
            }
            //making the current active services 'selected' in the dropdown list
            for(let i=0;i<this.partnerData.services.length;i++)
            {
              switch(this.partnerData.services[i])
              {
    case 'construction':document.getElementById('construction').setAttribute("selected","true");
    break;
    case 'electrical works':document.getElementById('electricalworks').setAttribute("selected","true");
    break;
    case 'plumbing':document.getElementById('plumbing').setAttribute("selected","true");
    break;
    case 'interior design':document.getElementById('interiordesign').setAttribute("selected","true");
    break;
    case 'garden making':document.getElementById('gardenmaking').setAttribute("selected","true");
    break;
    case 'maintenance':document.getElementById('maintenance').setAttribute("selected","true");
    break;
    case 'furnishing':document.getElementById('furnishing').setAttribute("selected","true");
    break;
    case 'painting':document.getElementById('painting').setAttribute("selected","true");
    break;
              }
            }
                },
          err=>{console.log(err);alert("Invalid Credentials!")}
    )
  }

  update()
  {
let drp=document.getElementById('district');
let drpserv=document.getElementById('service');
let str=[];
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
  this.partnerData.services=str;  //identifying services selected
    
    this.user.updatePartner(this.partnerData);
    this.router.navigate(['/partnerProfile']);
  }
}
