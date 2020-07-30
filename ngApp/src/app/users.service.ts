import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
                              //api URLs 
  private _userImgUpload='http://localhost:3232/api/userImgUpload';
  private _signupUserUrl='http://localhost:3232/api/signupUser';
  private _signinUserUrl='http://localhost:3232/api/signinUser';
  private _signupPartnerUrl='http://localhost:3232/api/signupPartner';
  private _signinPartnerUrl='http://localhost:3232/api/signinPartner';
  private _getUserUrl='http://localhost:3232/api/getUser';
  private _getPartnerUrl='http://localhost:3232/api/getPartner';
  private _updatePartnerUrl='http://localhost:3232/api/updatePartner';
  private _updateUserUrl='http://localhost:3232/api/updateUser';
  private _searchPartnerUrl='http://localhost:3232/api/search';
  private _getPartnersUrl='http://localhost:3232/api/getPartners';
  private _deletePartner='http://localhost:3232/api/deletePartner';

  constructor(private http:HttpClient) { }
  //database operations
  signupUser(user)
  {
    console.log(user);
    return this.http.post(this._signupUserUrl,{"user":user})
    // .subscribe((data)=>
    // {
    //   console.log(data);
    // })
  }
  userImage(profileImage: File)
  {                       //image upload
    var formData=new FormData();
    formData.append("file", profileImage);
    return this.http.post(this._userImgUpload,formData);
  }
  signinUser(user)
  {
    console.log("serv");
    console.log(user);
    return this.http.post(this._signinUserUrl,{"user":user});
                                                             
  }
  signupPartner(partner)
  {
    console.log("srvc");
    console.log(partner);
   return this.http.post(this._signupPartnerUrl,{"partner":partner})
  //  .subscribe((data)=>
  //  {
  //    console.log(data);
  //  })
  }
  signinPartner(partner)
  {
    console.log("srvc");
    console.log(partner);
    return this.http.post(this._signinPartnerUrl,{"partner":partner});
  }
  updatePartner(partner)
  {
    return this.http.post(this._updatePartnerUrl,{"partner":partner}).subscribe((data)=>{console.log(data)});
  }
  updateUser(user)
  {
    return this.http.post(this._updateUserUrl,{"user":user}).subscribe((data)=>{console.log(data)});
  }
  getUser()
  {
  ///console.log("srvc");
  let token=localStorage.getItem('token');
  if(!!token)
  {
    let decodedToken = jwt_decode(token);
   // console.log(decodedToken);
   // console.log(decodedToken['subject']);
    let id = decodedToken['subject'];
   return this.http.post(this._getUserUrl,{"id":id});
                                                       
  }
  }

  getPartner()
  {
  //console.log("srvc");
  let token=localStorage.getItem('token');
  if(!!token)
  {
    let decodedToken = jwt_decode(token);
    //console.log(decodedToken);
    //console.log(decodedToken['subject']);
    let id = decodedToken['subject'];
   return this.http.post(this._getPartnerUrl,{"id":id});
                                                       
  }
  }
  getPartners()
  {
    return this.http.get(this._getPartnersUrl);
  }
  deletePartner(id)
  {
    return this.http.post(this._deletePartner,{"id":id});
  }
    //search with service, location and optional Builder name field
  searchPartner(service,location,name)
  {
    return this.http.post(this._searchPartnerUrl,{"service":service,"location":location,"name":name});
  }

  //user identity
  loggedIn()
  {
    //console.log(!!localStorage.getItem('token'));
    return !!localStorage.getItem('token');
  }
  getToken()
  {
    return localStorage.getItem('token');
  }
  identifyUserRole()
{
  let token=localStorage.getItem('token');

  if(!!token)
  {
    let decodedToken = jwt_decode(token);
    let userType=decodedToken['type'];
   // console.log(decodedToken);
    //console.log(decodedToken['subject']);
    if(userType=='admin')
    {
      console.log("FULL ACCESS GRANTED!")
      return true;
    }
    else
    {
      //console.log("FULL ACCESS DENIED!")
      return false;
    } 
  }
  else
  {
    return false;
  }

}
  isPartner()
  {
  let token=localStorage.getItem('token');

  if(!!token)
  {
    let decodedToken = jwt_decode(token);
    let userType=decodedToken['type'];
    //console.log(decodedToken);
    //console.log(decodedToken['subject']);
    if(userType=='partner')
    {
      //console.log("Partner Logged In");
      return true;
    }
    else
    {
      console.log("User Logged in");
      return false;
    }
  }
  else
  {
    return false;
  }

  }

}
