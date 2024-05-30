import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MapGeneratorPage } from './map-generator/map-generator.page';
import { LoginPage } from './login/login.page';
import { ServicesListPage } from './services-list/services-list.page';
import { MapViewPage } from './map-view/map-view.page';

const routes: Routes = [
  {
    path: 'map-routes',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'map-generator',
    // loadChildren: () => import('./map-generator/map-generator.module').then( m => m.MapGeneratorPageModule)
    component:MapGeneratorPage
  },
  {
    path: 'login',
    component:LoginPage
    // loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'services-list',
    component:ServicesListPage
    // loadChildren: () => import('./services-list/services-list.module').then( m => m.ServicesListPageModule)
  },
  {
    path: 'map-view',
    component:MapViewPage
    // loadChildren: () => import('./map-view/map-view.module').then( m => m.MapViewPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
