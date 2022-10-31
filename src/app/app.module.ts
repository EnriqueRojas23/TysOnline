import {  TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './_services/auth.service';
import { ToastrModule } from 'ngx-toastr';
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from './shared/shared.module';
import { APP_ROUTES } from './app.routes';
import { NgxLoadingModule } from 'ngx-loading';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListadoordentransportelibreComponent } from './listadoordentransportelibre/listadoordentransportelibre.component';
import { FileModal2Component } from './listadoordentransportelibre/modalfiles2';
import { GuiasModal2Component } from './listadoordentransportelibre/modalguias2';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DragDropModule } from 'primeng/dragdrop';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ProgressBarModule } from 'primeng/progressbar';
import { OrdenTransporteService } from './_services/Seguimiento/ordentransporte.service';
import { Data } from './_providers/data';
import { GeneralService } from './_services/Mantenimiento/general.service';
import { UserService } from './_services/user.service';
import { TableModule } from 'primeng/table';
import { ProgramacionplacaComponent } from './pages/seguimiento/ordenesrecojo/programacionplaca/programacionplaca.component';
import { ListadoplacasprogramadasComponent } from './pages/seguimiento/ordenesrecojo/listadoplacasprogramadas/listadoplacasprogramadas.component';
import { CalendarModule as CalendarModule2, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { VerordenoriflameComponent } from './pages/seguimiento/ordentransporte/verordenoriflame/verordenoriflame.component';
import { AgmCoreModule } from '@agm/core';
import { CarouselModule } from 'primeng/carousel';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';





@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      PagesComponent,
      ListadoordentransportelibreComponent,
      FileModal2Component,
      GuiasModal2Component,
      ProgramacionplacaComponent,
      ListadoplacasprogramadasComponent,
      VerordenoriflameComponent


   ],
   imports: [
      BrowserModule,
      SharedModule,
      HttpClientModule,
      CommonModule,
      APP_ROUTES,
      ToastrModule.forRoot(),
      FormsModule,
      BrowserAnimationsModule,
      SweetAlert2Module.forRoot({ }),
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      NgxLoadingModule.forRoot({}),
      NgbModule,
      MatPaginatorModule,
      MatSortModule,
      CalendarModule,
      NgxLoadingModule.forRoot({
     }),

     SweetAlert2Module,
     ConfirmDialogModule,
     ProgressBarModule,
     ButtonModule,
     DropdownModule,
     DragDropModule,
     DynamicDialogModule,
     TableModule,
     CalendarModule2.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDnh35oUHQYGDPcVs6rfKOY057Xo7ujDsQ'
    }),
    CarouselModule,
    GridModule   ,
    DropDownsModule,
    DateInputsModule,

   ],
   providers: [
      AuthService,

      OrdenTransporteService,
      UserService,
      GeneralService,
      Data,

   ],
   bootstrap: [
      AppComponent
   ],
   entryComponents: [
      FileModal2Component,
      GuiasModal2Component,


    ],
})
export class AppModule { }
