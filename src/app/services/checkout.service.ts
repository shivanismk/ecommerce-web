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

  

  checkout(data:any): Observable<any>{
     return this.httpClient.post(`${environment.url}/checkout/`,data).
     pipe(map((result:any)=>result)); 
  }
  makePayment(stripeToken: any): Observable<any>{
    // const url = "http://localhost:5000/checkout/"
 
    return this.httpClient.post<any>(`${environment.url}/checkoutt`,{token:stripeToken})
  }

}
