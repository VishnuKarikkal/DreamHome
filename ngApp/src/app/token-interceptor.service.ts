import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import {UsersService} from './users.service';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector:Injector) { }
  intercept(req,nxt)
  {
    let userService=this.injector.get(UsersService);
    let tokenisedReq=req.clone(
      {
        setHeaders:
        {
          Authorization:`Bearer ${userService.getToken()}`
        }
      }
                              );
    return nxt.handle(tokenisedReq);
  }
}
