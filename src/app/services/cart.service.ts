import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient: HttpClient) { }




  // Product(prodid:any):Observable<any>{
  //   return this.httpClient.get<any>(`${environment.url}/get_product/${prodid}`)
  // }
  addOrder(data:any,prodid:any): Observable<any>{
    return this.httpClient.post(`${environment.url}/addCart/${prodid}`,data).
    pipe(map((result:any)=>result));
 }



viewCart():Observable<any>{
return this.httpClient.get<any>(`${environment.url}/viewCart`)
}

deleteCartProduct(id:any): Observable<any>{
  return this.httpClient.delete<any>(`${environment.url}/deleteCartProduct/${id}`)
}

}
