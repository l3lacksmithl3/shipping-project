import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import { ImportService } from '../service/import.service';
import { saveAs } from 'file-saver'
import {formatDate} from '@angular/common';
@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {
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
    this.import_.get_model_master().subscribe((data: any) => {
     if(data){
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
        for (let n = 0; n < wb.SheetNames.length; n++) {
          const wsname: string = wb.SheetNames[n];
          const ws: XLSX.WorkSheet = wb.Sheets[wsname];
          let data : any = XLSX.utils.sheet_to_json(ws);
          for (let i = 0; i < data.length; i++) {            
            data[i].date = date;
            data[i].type = wsname;
          }          
          this.import_.import_model_master(data).subscribe((data: any) => {
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
      }
      reader.readAsBinaryString(target.files[0]);
  }

}
