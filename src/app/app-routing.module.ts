import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from '../app/history/history.component';
import { ImportComponent } from '../app/import/import.component';
import { MemberComponent } from '../app/member/member.component';
import { ShippingComponent } from '../app/shipping/shipping.component';
import { SendmailComponent } from '../app/sendmail/sendmail.component';
import { CreateQRComponent } from '../app/create-qr/create-qr.component';
import { PrintLabelComponent } from '../app/print-label/print-label.component';
import { PrintQrcodeComponent } from '../app/print-qrcode/print-qrcode.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MasterComponent } from './master/master.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'shipping',
    pathMatch: 'full',

  },
  {
    path: 'history', component: HistoryComponent
  },
  {
    path: 'import', component: ImportComponent
  },
  {
    path: 'member', component: MemberComponent
  },
  {
    path: 'shipping', component: ShippingComponent
  },
  {
    path: 'sendmail', component: SendmailComponent
  },
  {
    path: 'createqr', component: CreateQRComponent
  },
  {
    path: 'print_label', component: PrintLabelComponent
  },
  {
    path: 'print_qrcode', component: PrintQrcodeComponent
  },
  {
    path: 'dashboard', component: DashboardComponent
  },
  {
    path: 'master', component: MasterComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
