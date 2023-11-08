import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ScriptLoaderModule } from 'ngx-script-loader';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HistoryComponent } from './history/history.component';
import { ImportComponent } from './import/import.component';
import { MemberComponent } from './member/member.component';
import { ShippingComponent } from './shipping/shipping.component';
import { SendmailComponent } from './sendmail/sendmail.component';
import { HeaderComponent } from './templates/header/header.component';
import { FooterComponent } from './templates/footer/footer.component';
import { CreateQRComponent } from './create-qr/create-qr.component';
import {RouterModule} from '@angular/router';
import { PrintLabelComponent } from './print-label/print-label.component';
import { PrintQrcodeComponent } from './print-qrcode/print-qrcode.component';
import { QRCodeModule } from 'angular2-qrcode';
import { MasterComponent } from './master/master.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HistoryComponent,
    ImportComponent,
    MemberComponent,
    ShippingComponent,
    SendmailComponent,
    HeaderComponent,
    FooterComponent,
    CreateQRComponent,
    PrintLabelComponent,
    PrintQrcodeComponent,
    MasterComponent,
  ],
  imports: [
    BrowserModule,   
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ScriptLoaderModule,
    HttpClientModule,
    QRCodeModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
