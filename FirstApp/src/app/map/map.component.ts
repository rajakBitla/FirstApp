import { Component, OnInit } from '@angular/core';

import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  private map: any;
  private origin = L.latLng(25.1972, 55.2744);
  private destination = L.latLng(25.2567, 55.3643);

  constructor() { }

  ngOnInit() {
    setTimeout(() => { this.map.invalidateSize() }, 300);

    this.map = L.map('mapId', {
      center: this.origin,
      zoom: 13
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

    const carIcon = L.icon({
      iconUrl: './assets/icon/busicon.png',
      iconSize: [25, 25],
      iconAnchor: [12, 12]
    });
    const originIcon = L.icon({
      iconUrl: './assets/icon/origin.png',
      iconSize: [30, 30],
      iconAnchor: [15, 30]
    });
    const destinationIcon = L.icon({
      iconUrl: './assets/icon/destination.png',
      iconSize: [30, 30],
      iconAnchor: [15, 30]
    });

    const originMarker = L.marker(this.origin, { icon: originIcon }).addTo(this.map);
    originMarker.bindTooltip(`<p>${this.origin}</p>`)
    const destinationMarker = L.marker(this.destination, { icon: destinationIcon }).addTo(this.map);
    destinationMarker.bindTooltip(`<p>${this.destination}</p>`)
    const carMarker = L.marker(this.origin, { icon: carIcon }).addTo(this.map);

    this.map.addLayer(originMarker);
    this.map.addLayer(destinationMarker);
    this.map.addLayer(carMarker);

    const latLang = [this.origin, this.destination];
    const polylines = L.polyline(latLang, { color: 'red' }).addTo(this.map);
    this.map.setView(this.origin, 13);
    this.animateMarker(carMarker, this.destination, 20000);
  }

  private animateMarker(marker: L.Marker, destination: L.LatLng, duration: number) {
    const start = performance.now();
    // console.log(start);
    
    const from = marker.getLatLng();

    const step = (timestamp: number) => {
      // console.log(timestamp+" ---->");
      
      const progress = timestamp - start;
      const fraction = progress / duration;

      if (fraction < 1) {
        const currentLatLng = L.latLng(
          from.lat + (destination.lat - from.lat) * fraction,
          from.lng + (destination.lng - from.lng) * fraction
        );
        marker.setLatLng(currentLatLng);
        marker.bindTooltip(`<p>${currentLatLng}</p>`)
        this.map.setView(currentLatLng);
        requestAnimationFrame(step);
      } else {
        marker.setLatLng(destination);
        this.map.setView(destination);
      }
    };
    requestAnimationFrame(step);
  }
}