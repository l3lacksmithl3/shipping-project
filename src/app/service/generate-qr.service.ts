import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GenerateQRService {

  APIURL: any;
  constructor(private http: HttpClient) {
    this.APIURL = environment.serverPath;
  }

  get_qrcode(): Observable<any> {
    return this.http.get('http://10.200.90.152:4022/get_qrcode')
  }
  get_qrcode_bydate(): Observable<any> {
    return this.http.get('http://10.200.90.152:4022/get_qrcode_bydate')
  }
  get_qrcode_sortdate(body:any): Observable<any> {
    return this.http.post('http://10.200.90.152:4022/get_qrcode_sortdate',body)
  }
  get_qrcode_sortdate_his(body:any): Observable<any> {
    return this.http.post('http://10.200.90.152:4022/get_qrcode_sortdate_his',body)
  }
  create_qrcode(body:any): Observable<any> {
    return this.http.post('http://10.200.90.152:4022/create_qrcode',body)
  }
  update_qrcode(body:any): Observable<any> {
    return this.http.post('http://10.200.90.152:4022/update_qrcode',body)
  }
  update_qrcode_sendmail(body:any): Observable<any> {
    return this.http.post('http://10.200.90.152:4022/update_qrcode_sendmail',body)
  }
  
}
