import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import { ImportService } from '../service/import.service';
import { saveAs } from 'file-saver'
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {

  @ViewChild('inputFile')
  inputFile!:ElementRef;
  isExcelFile!: boolean;
  datas:any = '';
  amount:any = 1;

  constructor(private import_:ImportService) { }

  ngOnInit(): void {
    this.get_data()
  }

  get_data(){
    // let today = formatDate(new Date(),'yyyy-MM-dd','en-US')    
    // this.import_.get_import().subscribe((data: any) => {
    //  if(data){
    //    for (let i = 0; i < data.length; i++) {
    //      let date = formatDate(new Date(data[i].date),'yyyy-MM-dd','en-US')         
    //      if(date = today){           
    //       this.datas = data
    //       console.log("this.datas",data);          
    //      }
    //    }
    //  }
    // });
    this.import_.get_import_bydate().subscribe((data: any) => {
     if(data){
       console.log("get_import_bydate",data);
       this.datas = data
     }
    });
  }

  import(evt:any){
    let date = new Date()
    const target: DataTransfer = <DataTransfer>evt.target;    
    this.isExcelFile = !!target.files[0].name.match(/(.xls|.xlsx|.txt)/);

      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        /* read workbook */
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
        
        /* grab first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

            /* save data */
        let data : any = XLSX.utils.sheet_to_json(ws);
        for (let i = 0; i < data.length; i++) {
          data[i].date = date;
          data[i].sendmail = 'false';
          data[i].story = this.amount;
          data[i].select_inv = '0';
        }       
        this.import_.import_file(data).subscribe((data: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Import Data Success!!',
              showConfirmButton: false,
              timer: 1500,
            }).then(function () { 
            });
              this.inputFile.nativeElement.value = ''   
              this.ngOnInit();
              window.location.reload();
          });
          
        }
      reader.readAsBinaryString(target.files[0]);
  }

}
