import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapGeneratorPageRoutingModule } from './map-generator-routing.module';

import { MapGeneratorPage } from './map-generator.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapGeneratorPageRoutingModule
  ],
  declarations: [MapGeneratorPage]
})
export class MapGeneratorPageModule {}
