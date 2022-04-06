import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }
  getCategories():Observable<any>{
    return this.httpClient.get<any>(`${environment.url}/get_categorys`);
  }

  createcategory(data:any): Observable<any>{
    return this.httpClient.post(`${environment.url}/create_category`,data).
     pipe(map((result:any)=>result)); 
  }
}
