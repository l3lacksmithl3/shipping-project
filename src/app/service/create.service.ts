import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CreateService {

  APIURL: any;
  constructor(private http: HttpClient) {
    this.APIURL = environment.serverPath;
  }

  get_member(): Observable<any> {
    return this.http.get('http://10.200.90.152:4022/get_member')
    // return this.http.post(this.APIURL + '/checklogin',body)
  }
  create_member(body:any): Observable<any> {
    return this.http.post('http://10.200.90.152:4022/create_member',body)
    // return this.http.post(this.APIURL + '/checklogin',body)
  }
  update_member(body:any): Observable<any> {
    return this.http.post('http://10.200.90.152:4022/update_member',body)
    // return this.http.post(this.APIURL + '/checklogin',body)
  }
  delete_member(body:any): Observable<any> {
    return this.http.post('http://10.200.90.152:4022/delete_member',body)
    // return this.http.post(this.APIURL + '/checklogin',body)
  }
  
}
