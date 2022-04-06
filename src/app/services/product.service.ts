import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse ,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
// import { Product } from '../models/product';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';



@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // } 
  Product(productId: any) {
    throw new Error('Method not implemented.');
  }
  
  
  constructor(private httpClient: HttpClient) { }

  viewProductList():Observable<Product>{
    return this.httpClient.get<Product>(`${environment.url}/get_products`).pipe(map((result:any)=>result)); 

  }
  creatProduct(data:any): Observable<any>{
    return this.httpClient.post(`${environment.url}/create_product`,data).
     pipe(map((result:any)=>result)); 
  }
   
  viewProduct(prodid:any):Observable<any>{
    return this.httpClient.get<any>(`${environment.url}/get_product/${prodid}`)
  }

  
  updateProduct(data:any): Observable<any>{
     return this.httpClient.post(`${environment.url}/update_product`,data).
     pipe(map((result:any)=>result)); 
  } 

  deleteProduct(prodid:any): Observable<any>{
     return this.httpClient.delete<any>(`${environment.url}/delete_product/${prodid}`)
  }




//create excel
  creatExcelProduct(data:any): Observable<any>{
    return this.httpClient.post(`${environment.url}/excel_import`,data).
     pipe(map((result:any)=>result)); 
  }
   
}

