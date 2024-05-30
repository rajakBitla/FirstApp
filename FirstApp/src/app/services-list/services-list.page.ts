import { Component, OnInit } from '@angular/core';
import { TrackingGoService } from '../tracking-go.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.page.html',
  styleUrls: ['./services-list.page.scss'],
})
export class ServicesListPage implements OnInit {
allData:any

  constructor(
    private trackinggoFactory :TrackingGoService ,
    private route:Router
  ) { }

  ngOnInit() {
    this.trackinggoFactory.Services().subscribe((res:any)=>{
      this.allData=res.data
      // console.log(res.data);
    })
  }
  goBack() {
    this.route.navigate(['/login'])
  }
  getData(){
    // console.log('Clicked');
    this.route.navigate(['/map-routes'])
  }


  formatDate(dateStr:any) {
    const [day, month, year] = dateStr.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const weekdayName = weekdays[date.getDay()];
    const monthName = months[month - 1];
    return `${weekdayName}, ${day} ${monthName}`;
}

}
