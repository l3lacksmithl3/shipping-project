import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from './../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  APIURL: any;
  constructor(private http: HttpClient) {
    // this.APIURL = environment.serverPath;
  }

  Loing(body:any): Observable<any> {
    return this.http.post('http://10.200.90.152:4022/login',body)
    // return this.http.post(this.APIURL + '/login',body)
  }
  
}
