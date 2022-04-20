import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private httpClient: HttpClient) { }



  // checkout(data:any): Observable<any>{
  //    return this.httpClient.post(`${environment.url}/checkout/`,data).
  //    pipe(map((result:any)=>result));
  // }
  checkout(data:any): Observable<any>{
    return this.httpClient.post(`${environment.url}/check_order/`,data).
    pipe(map((result:any)=>result));
 }

  

}
