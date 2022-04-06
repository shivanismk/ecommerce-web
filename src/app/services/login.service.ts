import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Register } from '../models/register';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private client:HttpClient,) { }
  loginuser(data:Register):Observable<any>{
    return this.client.post(`${environment.url}/login`,data).
    pipe(map((result:any)=>result))
  }

  viewAdmin(Aid:any):Observable<any>{
    return this.client.get<any>(`${environment.url}/login/${Aid}`)
  }
  viewUserList():Observable<any>{
    return this.client.get<any>(`${environment.url}/userList`)
  }


loggedIn(){
  // return !!localStorage.getItem('token') && !!localStorage.getItem('roles')
  if (this.getRoles() == 'admin' ) {
    return this.getRoles() && this.getToken();
  }else
  return false;
}

setToken(accessToken:any){
  localStorage.setItem('token',accessToken)
}

getToken(){
  return localStorage.getItem('token')
}

clear(){
  return localStorage.clear();
}

setRoles(roles:any){
  localStorage.setItem('roles',roles);
}

getRoles(){
return localStorage.getItem('roles');
}

}
