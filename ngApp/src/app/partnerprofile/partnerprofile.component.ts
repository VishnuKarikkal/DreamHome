import { Component, OnInit } from '@angular/core';
import {PartnerModel} from '../signup-partner/partnermodel';

import {Router} from '@angular/router';
import {UsersService} from '../users.service';
@Component({
  selector: 'app-partnerprofile',
  templateUrl: './partnerprofile.component.html',
  styleUrls: ['./partnerprofile.component.css']
})
export class PartnerprofileComponent implements OnInit {
  partnerData=new PartnerModel(null,null,null,null,null,null,null);
  
  constructor(private user:UsersService,private router:Router) { }

  ngOnInit(): void {
    this.user.getPartner().subscribe(
      (res:any)=>{             //typescript doesn't identify 'token' property in the 'res'
                                    //so to avoid error, used " res:any "
         
            this.partnerData=res.partner;
                },
          err=>{console.log(err);alert("Invalid Credentials!")}
    )
  }

}
