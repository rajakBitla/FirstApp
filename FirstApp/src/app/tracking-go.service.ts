import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrackingGoService {

  constructor(private http: HttpClient) { }
  Login(data: any) {
    return this.http.post('https://sys.trackingo.in/api/tracking/login', data)
  }
  Services() {
    return this.http.get('https://sys.trackingo.in/api/tracking/get_service_list?subdomain=verma&date=2024-05-28&service_id=&service_number=&vehicle_number=&origin_id=&destination_id=&all_vehicles=false&per_page=10&page_no=1&filter_type=&api_key=null')
  }
}
