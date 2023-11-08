import { Component, OnInit } from '@angular/core';
import { GenerateQRService } from '../service/generate-qr.service';
import { ImportService } from '../service/import.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  date_start:any;
  date_end:any;
  datas:any;
  dated:any = [];
  months:any;
  month:any = [];
  monthly:any = [];
  days:any;
  daies:any = [];
  studentOptions:any;
  dateOptions:any;
  
  // get_history
  sum:any = 0;
  data:any = [];
  datapro:any;
  data_production:any;
  data_production2:any;
  datalogis:any;
  data_logistic:any;
  data_logistic2:any;
  Ldata:any = [];
  Lsum:any = [];
  Ldata2:any = [];
  Lsum2:any = 0;


  
  constructor(private gen_qr : GenerateQRService,private import_:ImportService) { }

  ngOnInit(): void {
    this.get_data()
  }

  get_data(){
    this.gen_qr.get_qrcode().subscribe((data: any) => {
      if (data) {
        this.datas = data
        for (let n = 0; n < data.length; n++) {
          let Dateset = formatDate(data[n].date, 'yyyy-MM-dd','en-US');
          data[n].date = Dateset
        }        
        
        // distinct data
        this.studentOptions = data.filter((item: any, i: any, arr: any) => arr.findIndex((t: any) => t.date === item.date ) === i);
        for (let i = 0; i < this.studentOptions.length; i++) {
          this.dated.push(this.studentOptions[i].date)
        }

        // select month
        for (let m = 0; m < this.dated.length; m++) {
          let Dateset = formatDate(this.dated[m], 'MMMM' ,'en-US');
          this.month[m] = {date:Dateset}         
        }
        this.dateOptions = this.month.filter((item: any, i: any, arr: any) => arr.findIndex((t: any) => t.date === item.date ) === i);
        for (let i = 0; i < this.dateOptions.length; i++) {
          this.monthly.push(this.dateOptions[i].date)
        }
      }
    });
  }

  check_date(){
    this.daies = []
    let year = formatDate(new Date(), 'yyyy' ,'en-US');
    let Month
    switch (this.months) {
      case "January":
        Month = "01";
        break;
      case "February":
        Month = "02";
        break;
      case "March":
         Month = "03";
        break;
      case "April":
        Month = "04";
        break;
      case "May":
        Month = "05";
        break;
      case "June":
        Month = "06";
        break;
      case "July":
        Month = "07";
        break;
      case "August":
        Month = "08";
        break;
      case "September":
        Month = "09";
        break;
      case "October":
        Month = "10";
        break;
      case "November":
        Month = "11";
        break;
      case "December":
        Month = "12";
        break;
    }
    this.studentOptions = this.datas.filter((item: any, i: any, arr: any) => arr.findIndex((t: any) => t.date === item.date ) === i);    
    for (let i = 0; i < this.studentOptions.length; i++) {
      let get_year = formatDate(this.studentOptions[i].date, 'yyyy' ,'en-US');
      let get_month = formatDate(this.studentOptions[i].date, 'MM' ,'en-US');
      if (year == get_year && Month == get_month) {
        this.daies.push(this.studentOptions[i].date)
      }
    }
  }

  get_history(){
    this.data = []
    this.Ldata = []
    let body = {
      date : this.days
    }
    // logistic
    this.import_.get_import_sortdate_his(body).subscribe((data: any) => {
      if(data){
          this.datalogis = data        
        // distinct data
        this.data_logistic = this.datalogis.filter((item: any, i: any, arr: any) => arr.findIndex((t: any) => t['Delivery Note#'] === item['Delivery Note#'] && t.story === item.story ) === i);
        for (let x = 0; x < this.data_logistic.length; x++) {
          this.data_logistic2 = this.datalogis.filter((item: any, i: any, arr: any) => arr.findIndex((t: any) => t.story === item.story ) === i);
          for (let j = 0; j < this.datalogis.length; j++) {                            
            if(this.datalogis[j]['Delivery Note#'] == this.data_logistic[x]['Delivery Note#'] && this.datalogis[j].story == this.data_logistic[x].story){
              this.Lsum += Number(this.datalogis[j]['Sales QTY'])
            }
          }
          
          this.Ldata.push({invoice : this.data_logistic[x]['Delivery Note#'],qty : Number(this.Lsum),story : this.data_logistic[x].story,date : this.data_logistic[x].date})
          this.Lsum = 0
        }        
      }
     });
    //  production
    this.gen_qr.get_qrcode_sortdate_his(body).subscribe((data: any) => {
      if (data) {
          this.datapro = data          
        // distinct data
        this.data_production = this.datapro.filter((item: any, i: any, arr: any) => arr.findIndex((t: any) => t.invoice === item.invoice && t.story === item.story ) === i);        
        for (let x = 0; x < this.data_production.length; x++) {
          this.data_production2 = this.datapro.filter((item: any, i: any, arr: any) => arr.findIndex((t: any) => t.story === item.story ) === i); 
          for (let j = 0; j < this.datapro.length; j++) {                            
              if(this.datapro[j].invoice == this.data_production[x].invoice && this.datapro[j].story == this.data_production[x].story){
                this.sum += Number(this.datapro[j].qty)                
              }
            }
            this.data.push({invoice : this.data_production[x].invoice,model : this.data_production[x].model,total_pallet : this.data_production[x].total_pallet,qty : this.sum,status : this.data_production[x].status,story : this.data_production[x].story,date : this.data_production[x].date})
            this.sum = 0
          }
        }
    });
  }

}
