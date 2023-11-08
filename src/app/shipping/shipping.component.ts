import { Component, OnInit } from '@angular/core';
import { GenerateQRService } from '../service/generate-qr.service';
import { ImportService } from '../service/import.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {

  sum:any = 0;
  data:any = [];
  datapro:any;
  data_production:any;
  datalogis:any;
  data_logistic:any;
  Ldata:any = [];
  Lsum:any = 0;
  count_L:any = 0;
  count_P:any = 0;

  constructor(private gen_qr : GenerateQRService,private import_:ImportService) { }

  ngOnInit(): void {
    this.get_data()
  }

  get_data(){
    let date = formatDate(new Date(), 'yyyy-MM-dd','en-US')
    this.data = []
    let body = {
      date : date
    }
    // logistic
    this.import_.get_import_sortdate(body).subscribe((data: any) => {
      if(data){
        for (let p = 0; p < data.length; p++) {
          this.datalogis = data
        }
        // distinct data
        this.data_logistic = this.datalogis.filter((item: any, i: any, arr: any) => arr.findIndex((t: any) => t['Delivery Note#'] === item['Delivery Note#'] ) === i);
        for (let x = 0; x < this.data_logistic.length; x++) {
          for (let j = 0; j < this.datalogis.length; j++) {                            
            if(this.datalogis[j]['Delivery Note#'] == this.data_logistic[x]['Delivery Note#']){
              this.Lsum += Number(this.datalogis[j]['Sales QTY'])      
            }
          }
          let A = this.data_logistic[x]['Delivery Note#']
          let B = A.split('')
          // if(B[8] != 'C'){
            this.Ldata.push({invoice : this.data_logistic[x]['Delivery Note#'],qty : this.Lsum})
          // }
          this.Lsum = 0
        }             
        this.count_L = this.Ldata.length
      }
     });
     
    //  production
    this.gen_qr.get_qrcode_sortdate(body).subscribe((data: any) => {
      if (data) {
        for (let n = 0; n < data.length; n++) {
          this.datapro = data
        }        
        // distinct data
        this.data_production = this.datapro.filter((item: any, i: any, arr: any) => arr.findIndex((t: any) => t.invoice === item.invoice ) === i);
        for (let x = 0; x < this.data_production.length; x++) {
          for (let j = 0; j < this.datapro.length; j++) {                            
            if(this.datapro[j].invoice == this.data_production[x].invoice){
              this.sum += Number(this.datapro[j].qty)      
            }
          }
          let A = this.data_production[x].invoice
          let B = A.split('')
          // if(B[8] != 'C'){
            this.data.push({invoice : this.data_production[x].invoice,model : this.data_production[x].model,total_pallet : this.data_production[x].total_pallet,qty : this.sum})
          // }
          this.sum = 0
        }
        this.count_P = this.data.length
      }
    });
    
  }
}
