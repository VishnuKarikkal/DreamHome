import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from '../users.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _router:Router,public user:UsersService) { }

  ngOnInit(): void {
  }
  logout()
  {
    localStorage.removeItem('token');
    this._router.navigate(['']);
  }
 
  toggleDashboard()      //toggling user-dashboard
  {
    if(document.getElementById('drp').style.visibility=="hidden")
    {
      document.getElementById('drp').style.visibility="visible";
    }
    else
    {
      document.getElementById('drp').style.visibility="hidden";
    }
  }
}
