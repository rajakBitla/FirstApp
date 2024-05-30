import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

  private map: any;
  private origin = L.latLng(12.971599, 77.594566);
  private destination = L.latLng(13.0843, 80.2705);

  private animationRequest: number | null = null;
  private startTime: number | null = null;
  private pausedTime: number | null = null;
  private progress: number = 0;
  private pausePosition: L.LatLng | null = null;
  private marker!: L.Marker;
  private duration: number = 7000; 
  private waypoints = [
    L.latLng(this.origin),  
    L.latLng(13.1360, 78.1324),  
    L.latLng(13.2360, 78.5024),
    L.latLng(13.3986, 78.8725),
    L.latLng(13.5260, 78.9924),  
    L.latLng(13.6288, 79.4192),  
    L.latLng(13.7016, 79.9926),  
    L.latLng(13.7742, 80.2387),  
    L.latLng(this.destination)   
  ];

  constructor() { }

  ngOnInit() {
    setTimeout(() => { this.map.invalidateSize() }, 250);
    this.map = L.map('mapId', {
      center: this.origin,
      zoom: 8
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
    originMarker.bindTooltip(`<p>${this.origin}</p>`);
    const destinationMarker = L.marker(this.destination, { icon: destinationIcon }).addTo(this.map);
    destinationMarker.bindTooltip(`<p>${this.destination}</p>`);
    this.marker = L.marker(this.origin, { icon: carIcon }).addTo(this.map);

    this.map.addLayer(originMarker);
    this.map.addLayer(destinationMarker);
    this.map.addLayer(this.marker);

    const polylines = L.polyline(this.waypoints, { color: 'red' }).addTo(this.map);
    this.map.setView(this.origin, 8);
    this.animateMarker(this.marker, this.waypoints, this.duration);
  }

  private animateMarker(marker: L.Marker, waypoints: L.LatLng[], duration: number) {
    const totalDistance = this.calculateTotalDistance(waypoints);
    this.startTime = performance.now();

    const step = (timestamp: number) => {
      if (this.pausedTime) {
        this.startTime! += (timestamp - this.pausedTime);
        this.pausedTime = null;
      }

      this.progress = timestamp - this.startTime!;
      const progressRatio = this.progress / duration;
      const distanceToTravel = totalDistance * progressRatio;

      if (progressRatio < 1) {
        const currentLatLng = this.interpolatePosition(waypoints, distanceToTravel);
        marker.setLatLng(currentLatLng);
        this.map.setView(currentLatLng);
        this.animationRequest = requestAnimationFrame(step);
      } else {
        marker.setLatLng(this.destination);
        this.map.setView(this.destination);
        this.animationRequest = null;
      }
    };
    this.animationRequest = requestAnimationFrame(step);
  }

  private calculateTotalDistance(waypoints: L.LatLng[]): number {
    let totalDistance = 0;
    for (let i = 0; i < waypoints.length - 1; i++) {
      totalDistance += waypoints[i].distanceTo(waypoints[i + 1]);
    }
    return totalDistance;
  }

  private interpolatePosition(waypoints: L.LatLng[], distance: number): L.LatLng {
    let travelled = 0;
    for (let i = 0; i < waypoints.length - 1; i++) {
      const segmentDistance = waypoints[i].distanceTo(waypoints[i + 1]);
      if (travelled + segmentDistance > distance) {
        const remainingDistance = distance - travelled;
        const ratio = remainingDistance / segmentDistance;
        return L.latLng(
          waypoints[i].lat + (waypoints[i + 1].lat - waypoints[i].lat) * ratio,
          waypoints[i].lng + (waypoints[i + 1].lng - waypoints[i].lng) * ratio
        );
      }
      travelled += segmentDistance;
    }
    return waypoints[waypoints.length - 1];
  }

  public pauseAnimation() {
    if (this.animationRequest) {
      cancelAnimationFrame(this.animationRequest);
      this.animationRequest = null;
      this.pausedTime = performance.now();
      this.pausePosition = this.marker.getLatLng();
    }
  }

  public restartAnimation() {
    if (this.animationRequest) {
      cancelAnimationFrame(this.animationRequest);
    }
    this.progress = 0;
    this.startTime = null;
    this.pausedTime = null;
    this.pausePosition = null;
    this.marker.setLatLng(this.origin);
    this.map.setView(this.origin);
    this.animateMarker(this.marker, this.waypoints, this.duration);
  }
}
