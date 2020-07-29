import { Component, OnInit } from '@angular/core';
import {UsersService} from '../users.service';
@Component({
  selector: 'app-usercontrol',
  templateUrl: './usercontrol.component.html',
  styleUrls: ['./usercontrol.component.css']
})
export class UsercontrolComponent implements OnInit {
  partnerData=[];
  constructor(private user:UsersService) { }

  ngOnInit(): void {
    this.user.getPartners().subscribe((res:any)=>
    {
      if(res.message=="OK")
      {
        this.partnerData=res.data;
      }
      else
      {
        console.log("error");
      }
    })
  }

  deletePartner(id)
  {
    if(confirm("Are You Sure ? (This can't be undone..!!!)"))
    {
      this.user.deletePartner(id)
      .subscribe(
        (res:any)=>
        {
          if(res.message=="errorr")
          {
            alert("Unknown Error!");
          }
          else
          {
            console.log(res.message);
            alert("Deleted One Record!");
            window.location.reload();   //refreshing the page
          }
         
        });     //subscribe end
    }
    else
    {
      console.log("Action CANCELED!");
    }
  }

}
