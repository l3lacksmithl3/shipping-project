import { Component, OnInit } from '@angular/core';
import { GenerateQRService } from '../service/generate-qr.service';

@Component({
  selector: 'app-print-qrcode',
  templateUrl: './print-qrcode.component.html',
  styleUrls: ['./print-qrcode.component.css']
})
export class PrintQrcodeComponent implements OnInit {

  datas : any;
  studentOptions : any;
  data : any = [];
  sum : any = 0;
  type : any = 0;
  qrInfo : any = [];
  count_data : any = [];
  body : any = [];
  imageSource : any;
  img : any;
  constructor(private gen_qr : GenerateQRService) { }

  ngOnInit(): void {
    this.get_data()
    this.imageSource = 'data:image/jpeg;base64,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';
  }

  get_data(){
    this.gen_qr.get_qrcode_bydate().subscribe((data: any) => {
      if (data) {
        for (let n = 0; n < data.length; n++) {
          this.datas = data
        }        
        // distinct data
        this.studentOptions = this.datas.filter((item: any, i: any, arr: any) => arr.findIndex((t: any) => t.invoice === item.invoice ) === i);        
        for (let x = 0; x < this.studentOptions.length; x++) {
          for (let j = 0; j < this.datas.length; j++) {   
            if(this.datas[j].type == 'Normal'){  
              if(this.datas[j].invoice == this.studentOptions[x].invoice && this.datas[j].model == this.studentOptions[x].model ){
                console.log("invoice",this.datas[j].invoice , this.studentOptions[x].invoice);
                console.log("model",this.datas[j].model , );
                
                
                this.sum += Number(this.datas[j].qty)      
              }
            }else{
              if(this.datas[j].invoice == this.studentOptions[x].invoice ){
                this.sum += Number(this.datas[j].qty)      
              }                            
            }
          }
          this.data.push({invoice : this.studentOptions[x].invoice,model : this.studentOptions[x].model,total_pallet : this.studentOptions[x].total_pallet,qty : this.sum,status : this.studentOptions[x].status,type : this.studentOptions[x].type})
          this.sum = 0
        }
        
      }
    });
  }

  count(item:any){
    let A = item.status = 1
    let body = {
      invoice : item.invoice,
      status : A,
    }
    console.log(item);
    
    this.gen_qr.update_qrcode(body).subscribe((data: any) => {
      this.type = 1
      this.print();
    })
  }

  print_label(item:any){ 
    this.count_data = []  
    for (let i = 0; i < this.datas.length; i++) {  
      if(item.type == 'Normal'){
        if(item.invoice == this.datas[i].invoice){
          this.count_data.push(this.datas[i])   
          let bu =    this.datas[i].invoice + "," +  this.datas[i].qty + "," +  this.datas[i].no_pallet + ',' +  this.datas[i].total_pallet
          this.body.push(bu)
        } 
      }else{
        if(item.invoice == this.datas[i].invoice){  
          this.count_data.push(this.datas[i])   
          let bu =    this.datas[i].invoice + "," +  this.datas[i].qty + "," +  this.datas[i].no_pallet + ',' +  this.datas[i].total_pallet
          this.body.push(bu)
        } 
        // for (let k = 0; k < this.count_data.length; k++) {
        //   this.count_data[k].qrInfo = this.body[k]    
        // }
        // this.count(item);
      }
    }    
    for (let k = 0; k < this.count_data.length; k++) {
      this.count_data[k].qrInfo = this.body[k]    
    }
    console.log(item);
    
    this.count(item);
    
  }

  print(){
    const printContent:any = document.getElementById("print");
        const WindowPrt:any = window.open('', '', 'left=0,top=0,width=1000,height=900,toolbar=0,scrollbars=0,status=0');
        WindowPrt.document.write(printContent.innerHTML);
        WindowPrt.document.close();
        WindowPrt.focus();
        WindowPrt.print();
        WindowPrt.close();
        window.location.reload();
        this.type = 0
  }

}
