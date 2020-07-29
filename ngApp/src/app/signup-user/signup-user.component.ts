import { Component, OnInit } from '@angular/core';
import {ReactiveFormsModule,FormBuilder,Validators} from '@angular/forms';

import {Router} from '@angular/router';
import {UsersService} from '../users.service';
import {UserModel} from './usermodel';
import { LoginuserComponent } from '../loginuser/loginuser.component';
@Component({
  selector: 'app-signup-user',
  templateUrl: './signup-user.component.html',
  styleUrls: ['./signup-user.component.css']
})
export class SignupUserComponent implements OnInit {
  userData=new UserModel(null,null,null,null,null,null,null,null);
  image:File=null;
  constructor(public usersService:UsersService,private router:Router,private formBuilder:FormBuilder) { }
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
    district:['',[Validators.required]],
    phone:['',[
      Validators.pattern(/^(\d{3})\-(\d{3})\-(\d{4})$/),
      Validators.required
            ]], //xxx-xxx-xxxx
    email:['',[
      Validators.pattern(/^([\w\.\-]+)@([\w\-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/),
      Validators.required
            ]],
    password:['',[
      Validators.minLength(8),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*])(?=.*[0-9])(?!.*\s).{8,}$/),
      Validators.required
                ]],
    avatar:[null]
  })
  ngOnInit(): void {
  }
// Choose district using select dropdown
changeDistrict(e) 
{
  this.userData.district=e.target.value; //setting selected district
}

  signup()
  {
    console.log("Adding New User Account");
    if(this.image==null)
    {
      alert("please choose a profile image!");
    }
    else
    {
      if(document.getElementById('radioNormal')['checked'])   //checking user-type selected
      {
      this.userData.type='normal';
      }
     else
      {
      this.userData.type='admin';
      }
      let url;    //to store the incoming image Url--supplied by the upload function
      this.usersService.userImage(this.image)
      .subscribe((res)=>
      {
        url=res['url'];
        this.userData.imageUrl=url;
        this.usersService.signupUser(this.userData);
      })
     console.log("Account added!");
     alert("Account added!");
     this.router.navigate(['/loginUser']);
    }
     
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
}
