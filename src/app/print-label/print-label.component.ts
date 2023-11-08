import { Component, OnInit } from '@angular/core';
import { GenerateQRService } from '../service/generate-qr.service';
import { SendmailService } from '../service/sendmail.service';
import { ImportService } from '../service/import.service';
import { formatDate } from '@angular/common';
declare var require: any
const FileSaver = require('file-saver');
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';
import { jsPDF } from "jspdf";
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-print-label',
  templateUrl: './print-label.component.html',
  styleUrls: ['./print-label.component.css']
})
export class PrintLabelComponent implements OnInit {

  data: any = [];
  datapro: any;
  data_production: any;
  sum: any = 0;
  sum_all: any = 0;
  date: any;
  type: any;
  master : any;
  master_all : any;
  aaa : any = [1,2,3]
  // public data = sessionStorage.getItem('data');
  // public sum_all = sessionStorage.getItem('sum_all');

  constructor(private gen_qr: GenerateQRService, private send: SendmailService,private import_:ImportService) { }

  ngOnInit(): void {
    this.get_data()
  }

  get_data() {
    let date = formatDate(new Date(), 'yyyy-MM-dd', 'en-US')
    this.date = formatDate(date, 'dd/MM/yyyy', 'en-US')
    this.data = []
    let body = {
      date: date
    }
    //  production
    this.import_.get_model_master().subscribe((data: any) => {
      if(data){
        this.master_all = data
      }
    
      this.gen_qr.get_qrcode_sortdate(body).subscribe((data: any) => {
        if (data) {
          for (let n = 0; n < data.length; n++) {
            this.datapro = data
          }
          // distinct data
          this.data_production = this.datapro.filter((item: any, i: any, arr: any) => arr.findIndex((t: any) => t.invoice === item.invoice && t.model === item.model) === i);
          for (let x = 0; x < this.data_production.length; x++) {
            let A = this.data_production[x].invoice
            let B = A.split('')
            if(B[8] != 'C'){
              for (let j = 0; j < this.datapro.length; j++) {
                if (this.datapro[j].invoice == this.data_production[x].invoice && this.datapro[j].model == this.data_production[x].model) {
                  this.sum += Number(this.datapro[j].qty)
                  this.data_production[x].model = this.data_production[x].model
                }else if (this.datapro[j].invoice == this.data_production[x].invoice && this.datapro[j].model != this.data_production[x].model) {
                  this.sum += Number(this.datapro[j].qty)
                  this.data_production[x].model = this.data_production[x].model
                }
              }       
              this.master = this.master_all.filter((item: any, i: any, arr: any) => arr.findIndex((t: any) => t.HINBAN === item.HINBAN) === i);
              for (let m = 0; m < this.master.length; m++) {
                if(this.data_production[x].model == this.master[m].HINBAN){
                  this.data.push({ model_no: this.master[m].SEIHINNAME,invoice: this.data_production[x].invoice, model: this.data_production[x].model, total_pallet: this.data_production[x].total_pallet, qty: this.sum, type: this.data_production[x].type })
                }
              }
            }
            this.sum = 0
          }
          for (let x = 0; x < this.data.length; x++) {
            this.sum_all += Number(this.data[x].qty)
          }
          this.sum_all = this.sum_all.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        this.captureScreenPDF()
      });
    });
  }

  captureScreenPDF() {
    let printContents: any;
    let popupWin: any;

    printContents = document.getElementById("print")!.innerHTML.toString();
    printContents = (<string>printContents).replace("col-sm", "col-xs");

    popupWin = window.open("0", "_blank", "top=0,left=0,height=100,width=auto,scale=0.75");
    popupWin.document.open();
    popupWin.document.write(`
    <html>
      <head>
        <title>Report</title>
        <meta name="viewport" content="width=1, initial-scale=0.75, maximum-scale=0.75, user-scalable=no">
        <link rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <style>
          .salto_pagina_despues{
            page-break-after:always;
          }
          
          .salto_pagina_anterior{
            page-break-before:always;
          }

          .content {
            height: 100vh;
            width: 20px;
            display: flex;
            flex-direction: column;
          }

          .img-content {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 20px;
          }

          .observation {
            height: 60px;
            overflow: hidden;
            overflow-y: auto;
          }
          table {
            border-collapse: collapse;
          }
          table, th, td {
              border: 1px solid black;
              border-collapse: collapse;
          }        
        </style>
      </head>
      <body onload="window.print();" style="width: 20px;padding-top:1%;">
      <div class='container'>
        ${printContents}
      </div>
      </body>
    </html>`);
    /* window.close(); */
    popupWin.document.close();

  }
  // captureScreenPDF() {
  //   // let body = {
  //   //   sendmail : 'true'
  //   // }
  //   // this.gen_qr.update_qrcode_sendmail(body).subscribe((data: any) => {})
  //   // this.import_.update_import_file(body).subscribe((data: any) => {})

  //   // A4 size page of PDF 
  //   let date = formatDate(new Date(), 'yyyyMMdd_hhmmss', 'en-US')
  //   setTimeout(() => {
      
  //     let pdf: any;
  //     var data = document.getElementById('print')!;  //Id of the table    
  //     html2canvas(data).then(canvas => {   
  //       // Few necessary setting options  
  //       let imgWidth = 210; //208
  //       let imgHeight = canvas.height * imgWidth / canvas.width;
  //       const contentDataURL = canvas.toDataURL('image/png')
  //       let position = 0;

  //       pdf = new jspdf.jsPDF('p', 'mm', 'A4');
  //       pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
  //       pdf.save("AMPDF4040.X.FGINOUT-" + date + ".pdf"); // Generated PDF
  //       // let body = {
  //       //   name: "AMPDF4040.X.FGINOUT-" + date + ".pdf"
  //       // }
  //       // setTimeout(() => {
  //       //   this.send.sendmail(body).subscribe((data: any) => {})
  //       // }, 3000);
  //     });

  //     // this.type = 0 
  //   }, 2000);
  // }

}
