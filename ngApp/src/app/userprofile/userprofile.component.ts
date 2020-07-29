import { Component, OnInit } from '@angular/core';
import {UsersService} from '../users.service';
import { UserModel } from '../signup-user/usermodel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  userData=new UserModel(null,null,null,null,null,null,null,null);

  constructor(public user:UsersService,private router:Router) { }

  ngOnInit(): void {
this.user.getUser().subscribe(
  (res:any)=>{             //typescript doesn't identify 'token' property in the 'res'
                                //so to avoid error, used " res:any "
        this.userData=res.user;
            },
      err=>{console.log(err);alert("Invalid Credentials!")}
)

  }

}
