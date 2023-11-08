import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ImportService {

  APIURL: any;
  constructor(private http: HttpClient) {
    this.APIURL = environment.serverPath;
  }
  // on page import
  get_import(): Observable<any> {
    return this.http.get('http://10.200.90.152:4022/get_import')
  }
  // on page import
  get_import_bydate(): Observable<any> {
    return this.http.get('http://10.200.90.152:4022/get_import_bydate')
  }
  get_import_sortdate(body:any): Observable<any> {
    return this.http.post('http://10.200.90.152:4022/get_import_sortdate',body)
  }
  get_import_sortdate_his(body:any): Observable<any> {
    return this.http.post('http://10.200.90.152:4022/get_import_sortdate_his',body)
  }
  // on page create qr => get_invoice
  get_import_invoice(body:any): Observable<any> {
    return this.http.post('http://10.200.90.152:4022/get_import_invoice',body)
  }
  // on page create qr => get_data
  get_import_dataAMT(body:any): Observable<any> {
    return this.http.post('http://10.200.90.152:4022/get_import_dataAMT',body)
  }
  // on page import => import
  import_file(body:any): Observable<any> {
    return this.http.post('http://10.200.90.152:4022/import_file',body)
  }
  update_import_file(body:any): Observable<any> {
    return this.http.post('http://10.200.90.152:4022/update_import_file',body)
  }
  // on page master
  get_model_master(): Observable<any> {
    return this.http.get('http://10.200.90.152:4022/get_model_master')
  }
  import_model_master(body:any): Observable<any> {
    return this.http.post('http://10.200.90.152:4022/import_model_master',body)
  }
  update_import(body:any): Observable<any> {
    return this.http.post('http://10.200.90.152:4022/update_import',body)
  }
  
}
