import { VerordengeneralComponent } from './pages/seguimiento/ordentransporte/verordengeneral/verordengeneral.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoordentransportelibreComponent } from './listadoordentransportelibre/listadoordentransportelibre.component';
import { LoginComponent } from './login/login.component';
import { PagesComponent } from './pages/pages.component';
import { VerordenoriflameComponent } from './pages/seguimiento/ordentransporte/verordenoriflame/verordenoriflame.component';

import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';


const appRoutes: Routes = [
  {path : 'Listadoordentransportelibre', component : ListadoordentransportelibreComponent } ,
  {path : 'seguimiento/verordenoriflame/:uid', component : VerordenoriflameComponent } ,
  {path : 'seguimiento/verordengeneral/:uid', component : VerordengeneralComponent } ,
  {path : 'login', component : LoginComponent} ,
  {
       path: '',
       component: PagesComponent,
       // canActivate: [AuthGuard],
       loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
   },
   { path: '**', component: NopagefoundComponent },


];


export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash : true , onSameUrlNavigation: 'reload' } );
