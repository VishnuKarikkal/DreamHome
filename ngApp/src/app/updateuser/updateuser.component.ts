import { Component, OnInit } from '@angular/core';
import {ReactiveFormsModule,FormBuilder,Validators} from '@angular/forms';

import {Router} from '@angular/router';
import {UsersService} from '../users.service';
import {UserModel} from '../signup-user/usermodel';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {
  userData=new UserModel(null,null,null,null,null,null,null,null);
  signupform= this.formBuilder.group
  ({
    name:['',[
      Validators.pattern(/^([a-zA-Z]+|[a-zA-Z]+\s{1}[a-zA-Z]{1,}|[a-zA-Z]+\s{1}[a-zA-Z]{1,}\s{1}[a-zA-Z]{1,})$/),
      Validators.required
            ]],
    place:['',[
      Validators.pattern(/^([a-zA-Z])+$/),
      Validators.required
            ]],
    phone:['',[
      Validators.pattern(/^(\d{3})\-(\d{3})\-(\d{4})$/),
      Validators.required
            ]] //xxx-xxx-xxxx
  })
  constructor(public user:UsersService,private router:Router,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.user.getUser().subscribe(
      (res:any)=>{             //typescript doesn't identify 'token' property in the 'res'
                                    //so to avoid error, used " res:any "
            this.userData=res.user;
            switch(this.userData.district)
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
                },
          err=>{console.log(err);console.log("Invalid Credentials!")}
    )
  }

  changeDistrict(e)
  {
    this.userData.district=e.target.value;
  }
  update()
  {
    this.user.updateUser(this.userData);
    this.router.navigate(['/userProfile']);
  }
}
