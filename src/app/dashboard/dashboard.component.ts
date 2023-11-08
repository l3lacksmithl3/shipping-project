import { Component, OnInit , VERSION } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html', 
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent  {
  name :any
  public pages = new Array(100)
  constructor() {  this.name = `Angular! v${VERSION.full}` }
  
  ngOnInit(): void { }
  print() {
    let prtContent:any = document.getElementById('print');
    let WinPrint:any = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    WinPrint.document.write(prtContent.innerHTML);
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
    WinPrint.close();
  }
}
