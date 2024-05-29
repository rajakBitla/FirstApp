import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { TrackingGoService } from '../tracking-go.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  trackinggo: any = FormGroup
  allData: any
  showPassword=false
  constructor(
    private builder: FormBuilder,
    private toastController: ToastController,
    private trackinggoFactory: TrackingGoService,
    private route: Router
  ) { }

  async presentToast(position: 'top') {
    const toast = await this.toastController.create({
      message: 'Invalid credentials !',
      duration: 1500,
      position: position,
    });
    await toast.present();
  }
  tooglePassword(){
    this.showPassword=!this.showPassword
  }
  ngOnInit() {
    this.trackinggo = this.builder.group({
      email: new FormControl(''),
      subdomain: new FormControl(''),
      password: new FormControl('')
    })
  }
  submitSampleForm() {
    console.log(this.trackinggo.value);
    this.trackinggoFactory.Login(this.trackinggo.value).subscribe((data: any) => {
      this.allData=data;
      console.log(this.allData);
      if(this.allData===undefined){
        this.presentToast('top')
      }else{
        this.route.navigate(['/services-list'])
      }
      
    })
    
  }
}
