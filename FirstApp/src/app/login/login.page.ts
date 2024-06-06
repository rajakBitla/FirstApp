import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { TrackingGoService } from '../tracking-go.service';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  trackinggo: any = FormGroup
  allData: any
  showPassword=false
  dataFetch:boolean=false
  constructor(
    private platform: Platform,
    private builder: FormBuilder,
    private toastController: ToastController,
    private trackinggoFactory: TrackingGoService,
    private route: Router
  ) { }

  async presentToast(position:'login'|'fail' ) {
    if(position==='fail'){
      const toast = await this.toastController.create({
        message: 'Invalid credentials !',
        duration: 1500,
        position: 'top',
      });
      await toast.present();
    }else{
      const toast = await this.toastController.create({
        message: 'Logged in successfully',
        duration: 1500,
        position: 'top',
      });
      await toast.present();
    }
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Hide the splash screen once the app is ready
      SplashScreen.hide();
    });
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
    // console.log(this.allData);
    this.initializeApp();
  }
  submitSampleForm() {
    // console.log(this.trackinggo.value);
    this.trackinggoFactory.Login(this.trackinggo.value).subscribe((data: any) => {
      this.allData=data;
      if(data.status===200){
        this.presentToast('login')
        this.route.navigate(['/services-list'])
      }else{
        this.presentToast('fail')
        this.route.navigate(['/login'])
      }
    })
  
  }
}
