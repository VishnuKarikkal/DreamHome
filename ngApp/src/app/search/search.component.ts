import { Component, OnInit,OnDestroy } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UsersService} from '../users.service';
//import {PartnerModel} from '../signup-partner/partnermodel';
import { flatten } from '@angular/compiler';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit,OnDestroy {
  partnerData=[];
  location="";  //district selected from the dropdown
  search; //object passed from services component
  src;    //img-path passed
  service;  //service passed
  builder="";
  sub;
  isResults=false;
  message="";
  constructor(private users:UsersService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.sub =  this.activatedRoute.paramMap.subscribe((params)=>
                                                        {
                                                this.search = params.get('search');
                                                this.service=this.search.split(' ')[0];
                                                this.src=this.search.split(' ')[1];                                               
                                                        })
}
changeDistrict(e) 
{
  this.location=e.target.value; //setting selected district
}
searchNow()
{
let servc;
switch(this.service)
{
  case 'Construction':servc='construction';break;
  case 'Electrical-Works':servc='electrical works';break;
  case 'Painting':servc='painting';break;
  case 'Courtyard-Garden':servc='garden making';break;
  case 'Interior-Design':servc='interior design';break;
  case 'Plumbing':servc='plumbing';break;
  case 'Furnishing':servc='furnishing';break;
  case 'Home-Maintenance':servc='maintenance';break;
}
if(this.location=="")
{
  alert("Please Choose a Location to filter the results");
}
else
{
  this.users.searchPartner(servc,this.location,this.builder).subscribe(
    (res:any)=>
    {
      let mes=res.message;
      if(mes=="Ok")
      {
        this.message="Search Results";
        this.isResults=true;
        this.partnerData=res.data;
        //console.log("OK MSG");
        console.log(this.partnerData);
  
      }
      else
      {
        this.message="No Results, please redefine your search!";
        this.isResults=false;
       // console.log("No results");
      }
    },
    (err)=>
    {
      this.message="No Results, please redefine your search!";
      this.isResults=false;
      console.log(err);
    })
  
    document.getElementById('results').scrollIntoView(); //scroll to the results
}
}
  
ngOnDestroy()
  {
this.sub.unsubscribe();
  }
}
