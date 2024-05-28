import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA,  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { MapComponent } from '../map/map.component';
import { HomePageRoutingModule } from './home-routing.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,

  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
  declarations: [HomePage,MapComponent]
})
export class HomePageModule {}
