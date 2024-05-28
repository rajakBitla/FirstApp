import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
@Component({
  selector: 'app-map-generator',
  templateUrl: './map-generator.page.html',
  styleUrls: ['./map-generator.page.scss'],
})
export class MapGeneratorPage implements OnInit {
  private map: any
  constructor() { }

  ngOnInit() {
    setTimeout(() =>{ this.map.invalidateSize()}, 300);
    this.map = L.map('mapId', {
      center: [25.1972, 55.2744],
      zoom: 13
    })
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
    const myIcon = L.icon({
      iconUrl: './assets/icon/busTop.png',
      iconSize: [50, 50],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
      shadowUrl: 'my-icon-shadow.png',
      // shadowSize: [68, 95],
      // shadowAnchor: [22, 94]
  });
    const markPoint=L.marker([25.1972, 55.2744],{icon:myIcon}).addTo(this.map)
    markPoint.bindPopup(`<p>Burj Khalifa</p>`)
    this.map.addLayer(markPoint )
  }
}
