import { Injectable } from '@angular/core';
import {  CanActivate,Router,  ActivatedRouteSnapshot } from '@angular/router';

import { LoginService } from './services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 
  constructor( private authService:LoginService,
       private router:Router       
    ){}
  
    canActivate(route: ActivatedRouteSnapshot) : boolean | any {
      // let user = sessionStorage.getItem('user');
if (this.authService.loggedIn()){
  return true
}else {
  this.router.navigate(['/login'])
  return false
}


    }

}







  // canActivateChild(
  //   childRoute: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  // canDeactivate(
  //   component: unknown,
  //   currentRoute: ActivatedRouteSnapshot,
  //   currentState: RouterStateSnapshot,
  //   nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  // canLoad(
  //   route: Route,
  //   segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }

