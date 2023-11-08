import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SendmailService {

  APIURL: any;
  constructor(private http: HttpClient) {
    this.APIURL = environment.serverPath;
  }

  sendmail(body:any): Observable<any> {
    return this.http.post('http://10.200.90.152:4022/sendmail',body)
  }

  // sendmail(file: any) {
  //   // const headers = new HttpHeaders().set('x-access-token', this.token);
  //   return new Promise((resolve, reject) => {
  //     let uploadData = new FormData();
  //     uploadData.append('pdfName', file);    
  //     this.http.post('http://10.200.90.152:4021/sendmail', uploadData).subscribe((data) => { resolve(data); },(err) => { reject(err); });
  //   });
  // }

  // sendmail(file: any) {
  //   const formData = new FormData();
  //   formData.append('pdfName', file);
  //   this.http.post('http://10.200.90.152:4021/sendmail', formData)
  //     .subscribe(res => {
  //       console.log(res);
  //       alert('Uploaded Successfully.');
  //     })
  // }
  
 async uploadBannerIamge(file: any) {
  // const headers = new HttpHeaders().set('x-access-token', this.token);
  return new Promise((resolve, reject) => {
    const uploadData = new FormData();
    uploadData.append('pdfName', file);
    this.http
      .post('http://10.200.90.152:4022/sendmail', uploadData,)
      .subscribe(
        (data) => {
          resolve(data);
        },
        (err) => {
          reject(err);
        }
      );
  });
}
}
