import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import {UsersService} from './users.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 
  constructor(private user:UsersService,private router:Router){}
  canActivate():boolean
  {
    if(this.user.loggedIn())
    {
      console.log("Guard True");
      return true;
    }
    else
    {
      console.log("Guard False");
      this.router.navigate(['/']);
      return false;
    }
  }
}
