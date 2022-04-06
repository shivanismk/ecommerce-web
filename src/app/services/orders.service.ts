import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpClient: HttpClient) { }


  orderList(): Observable<any>{ 
    return this.httpClient.get(`${environment.url}/orders`)
  }


  deleteOrder(Oid:any): Observable<any>{
    return this.httpClient.delete<any>(`${environment.url}/delete_order/${Oid}`)
 }

}
