import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Register } from '../models/register';
import{map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor( private client:HttpClient) { }

  registeruser(data:any):Observable<any>{
    return this.client.post(`${environment.url}/register`,data).
    pipe(map((result:any)=>result));
}



}
