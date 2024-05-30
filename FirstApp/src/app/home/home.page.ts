import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(
    private route: Router
  ) { }
  ngOnInit(): void {
  }
  goBack() {
    this.route.navigate(['/services-list'])
  }
}
