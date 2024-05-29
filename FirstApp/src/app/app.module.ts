import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { QRCodeModule } from 'angularx-qrcode';
import { MapGeneratorPage } from './map-generator/map-generator.page';
import { LoginPage } from './login/login.page';
import { ServicesListPage } from './services-list/services-list.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MapViewPage } from './map-view/map-view.page';


@NgModule({
  declarations: [AppComponent,MapGeneratorPage,LoginPage,ServicesListPage,MapViewPage],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,QRCodeModule,FormsModule,ReactiveFormsModule,HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class AppModule {}
