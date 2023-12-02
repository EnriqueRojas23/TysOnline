import { PendientesliquidacionrepartidoresComponent } from './seguimiento/liquidacion/pendientesliquidacionrepartidores/pendientesliquidacionrepartidores.component';
import { NuevatarifarepartidorComponent } from './seguimiento/tarifas/nuevatarifarepartidor/nuevatarifarepartidor.component';
import { EditartarifarepartidorComponent } from './seguimiento/tarifas/editartarifarepartidor/editartarifarepartidor.component';
import { ListadotarifarepartidorComponent } from './seguimiento/tarifas/listadotarifarepartidor/listadotarifarepartidor.component';
import { ListadorepartidoresComponent } from './seguimiento/tarifas/listadorepartidores/listadorepartidores.component';
import { CamModalComponent } from './seguimiento/ordentransporte/confirmarentrega/modal.cam';
import { ReportecomercialComponent } from './kpis/reportecomercial/reportecomercial.component';
import {  UploadModalComponent } from './seguimiento/ordentransporte/confirmarentrega/modal.upload';
import { VerordengeneralComponent } from './seguimiento/ordentransporte/verordengeneral/verordengeneral.component';
import { VincularfacturaComponent } from './seguimiento/liquidacion/vincularfactura/vincularfactura.component';
import { NuevatarifaComponent } from './seguimiento/proveedores/nuevatarifa/nuevatarifa.component';
import { ListadotarifaproveedorComponent } from './seguimiento/proveedores/listadotarifaproveedor/listadotarifaproveedor.component';
import { ListadoproveedoresComponent } from './seguimiento/proveedores/listadoproveedores/listadoproveedores.component';
import { SustentarhrComponent } from './seguimiento/sustentos/sustentarhr/sustentarhr.component';
import { SustentospendientesComponent } from './seguimiento/sustentos/sustentospendientes/sustentospendientes.component';
import { ListadoordentransporteclienteComponent } from './seguimiento/ordentransporte/listadoordentransportecliente/listadoordentransportecliente.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
import { PAGES_ROUTES } from './pages.routes';
import { CommonModule, DatePipe } from '@angular/common';
import {DragDropModule} from 'primeng/dragdrop';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';



import { ProgressBarModule} from 'primeng/progressbar';
import { NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { CalendarModule} from 'primeng/calendar';
import { SharedModule } from '../shared/shared.module';
import { CarouselModule} from 'primeng/carousel';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';





import { SplitButtonModule } from 'primeng/splitbutton';
import {StepsModule} from 'primeng/steps';
import {SidebarModule} from 'primeng/sidebar';
import {ToastModule} from 'primeng/toast';
import {DialogService, DynamicDialogModule} from 'primeng/dynamicdialog';
import { TooltipModule } from 'primeng/tooltip';
import {InputSwitchModule} from 'primeng/inputswitch';

import { AngularDualListBoxModule } from 'angular-dual-listbox';

import { TreeviewModule } from 'ngx-treeview';

import {BlockUIModule} from 'primeng/blockui';
import {PanelModule} from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';

import {ChartModule} from 'primeng/chart';
import {MultiSelectModule} from 'primeng/multiselect';
import {OverlayPanelModule} from 'primeng/overlaypanel';

import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {CheckboxModule} from 'primeng/checkbox';
import { ListadoordentransporteComponent } from './seguimiento/ordentransporte/listadoordentransporte/listadoordentransporte.component';
import { VerordenComponent } from './seguimiento/ordentransporte/verorden/verorden.component';
import { FileModalComponent } from './seguimiento/ordentransporte/listadoordentransporte/modalfiles';
import { ConfirmationService } from 'primeng/api';
import { IndexComponent } from './index/index.component';

import { GuiasModalComponent } from './seguimiento/ordentransporte/listadoordentransporte/modalguias';
import { OrdenTransporteService } from '../_services/Seguimiento/ordentransporte.service';
import { Data } from '../_providers/data';
import { ListadoordenesrecojoComponent } from './seguimiento/ordenesrecojo/listadoordenesrecojo/listadoordenesrecojo.component';
import { NuevaordenrecojoComponent } from './seguimiento/ordenesrecojo/nuevaordenrecojo/nuevaordenrecojo.component';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { AsignarequipotransporteComponent } from './seguimiento/ordenesrecojo/asignarequipotransporte/asignarequipotransporte.component';
import { BuscarPlacaComponent } from './seguimiento/ordenesrecojo/asignarequipotransporte/modal.buscarplaca';
import { BuscarChoferComponent } from './seguimiento/ordenesrecojo/asignarequipotransporte/modal.buscarchofer';
import { EditarordenrecojoComponent } from './seguimiento/ordenesrecojo/editarordenrecojo/editarordenrecojo.component';
import { CalendarModule as CalendarModule2, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AsignarguiasComponent } from './seguimiento/ordenesrecojo/asignarguias/asignarguias.component';
import { PendientesliquidacionComponent } from './seguimiento/liquidacion/pendientesliquidacion/pendientesliquidacion.component';
import { LiquidarordenComponent } from './seguimiento/liquidacion/liquidarorden/liquidarorden.component';
import { PorestadosotComponent } from './kpis/porestadosot/porestadosot.component';
import { TiempoentregaComponent } from './kpis/tiempoentrega/tiempoentrega.component';
import { RetornodocumentarioComponent } from './kpis/retornodocumentario/retornodocumentario.component';
import { Retornodocumentario1Component } from './kpis/retornodocumentario1/retornodocumentario1.component';
import { LiquidardocumentosComponent } from './seguimiento/liquidacion/liquidardocumentos/liquidardocumentos.component';
import { PendientesmanifiestosComponent } from './seguimiento/liquidacion/pendientesmanifiestos/pendientesmanifiestos.component';
import { LiquidaordenotComponent } from './seguimiento/liquidacion/liquidaordenot/liquidaordenot.component';
import { LiquidarComponent } from './seguimiento/liquidacion/liquidaordenot/modal.liquidar';
import { AsignarEstibaComponent } from './seguimiento/ordenesrecojo/listadoplacasprogramadas/modal.asignarestiba';
import { VerAsignacionComponent } from './seguimiento/ordenesrecojo/listadoplacasprogramadas/modal.verasignacion';
import { LiquidarManifiestoComponent } from './seguimiento/liquidacion/pendientesmanifiestos/modal.liquidarmanifiesto';
import { OtroServicioComponent } from './seguimiento/liquidacion/liquidardocumentos/modal.otroservicio';
import { ReportependientesliquidacionComponent } from './reportes/reportependientesliquidacion/reportependientesliquidacion.component';
import { ReportependientesingresosComponent } from './reportes/reportependientesingresos/reportependientesingresos.component';
import { ReportependientesdespachoComponent } from './reportes/reportependientesdespacho/reportependientesdespacho.component';
import { AgmCoreModule } from '@agm/core';
import { UploadfileComponent } from './seguimiento/ordentransporte/uploadfile/uploadfile.component';

import { ToolbarModule as ToolbarModule2 } from 'primeng/toolbar';

import { EditartarifaComponent } from './seguimiento/proveedores/editartarifa/editartarifa.component';
import { VincularComponent } from './seguimiento/liquidacion/vincularfactura/modal.vincular';
import { ConfirmarentregaComponent } from './seguimiento/ordentransporte/confirmarentrega/confirmarentrega.component';
import { FileUploadModule } from 'primeng/fileupload';
import { RepartidorModalComponent } from './seguimiento/ordentransporte/confirmarentrega/modal.repartidor';
import { OtspendientesComponent } from './seguimiento/retorno/otspendientes/otspendientes.component';
import { ManifiestoComponent } from './seguimiento/hojaruta/manifiesto/manifiesto.component';
import { AgrupadoplanningComponent } from './planning/agrupadoplanning/agrupadoplanning.component';
import { GenerarrutasComponent } from './planning/generarrutas/generarrutas.component';
import { ModalTipoUnidadComponent } from './planning/generarrutas/modaltipounidad';
import { ModalAsignaraCargaComponent } from './planning/generarrutas/modalasignaracarga';
import { ModalAsignarTipoOperacionComponent } from './planning/generarrutas/modalasignartipooperacion';
import { HojarutaComponent } from './seguimiento/hojaruta/hojaruta.component';

import { AgregarOThrModalComponent } from './seguimiento/hojaruta/modalagregarothr';
import { AsignarPlacaComponent } from './planning/generarrutas/modal.asignarplaca';
import { OperacioncargaComponent } from './planning/operacioncarga/operacioncarga.component';
import { OperaciondetalleComponent } from './planning/operacioncarga/operaciondetalle/operaciondetalle.component';
import { PickListModule } from 'primeng/picklist';
import { PrecintosModalComponent } from './seguimiento/hojaruta/modalprecintos';
import { DesasignarModalComponent } from './seguimiento/hojaruta/modaldesasignar';
import { GrtModalComponent } from './seguimiento/hojaruta/modalgrt';
import { ConfirmarEstibaModalComponent } from './seguimiento/hojaruta/modalconfirmarestiba';
import { ArmadoValijaModalComponent } from './seguimiento/hojaruta/modalarmadovalija';
import { AutorizarEstibaModalComponent } from './seguimiento/hojaruta/modalautorizarestiba';
import { EquipostraficoComponent } from './trafico/equipostrafico/equipostrafico.component';
import { VistaenrutaComponent } from './trafico/vistaenruta/vistaenruta.component';
import { CambiarEstadoModalComponent } from './trafico/vistaenruta/modalcambiarestado';
import { ModalReprogramarArribosComponent } from './trafico/vistaenruta/modalreprogramararribos';
import { VistarepartidorComponent } from './trafico/vistarepartidor/vistarepartidor.component';
import { EventosModalComponent } from './trafico/vistaenruta/modaleventos';
import { EntregarOtModalComponent } from './trafico/vistarepartidor/modalentregarOT';
import { AutorizarReinicioModalComponent } from './seguimiento/hojaruta/modalautorizarreinicio';
import { ProgramarArribosModalComponent } from './trafico/vistarepartidor/modalProgramarArribos';
import { EnvioCargoModalComponent } from './trafico/vistarepartidor/modalenviocargoOT';
import { ConfirmarrecepcionComponent } from './almacen/confirmarrecepcion/confirmarrecepcion.component';







@NgModule({
  declarations: [


    ListadoordentransporteComponent,
    VerordenComponent,
    FileModalComponent,
    GuiasModalComponent,
    IndexComponent,
    ListadoordenesrecojoComponent,
    NuevaordenrecojoComponent,
    AsignarequipotransporteComponent,
    BuscarPlacaComponent,
    BuscarChoferComponent,
    EditarordenrecojoComponent,
    AsignarguiasComponent,
    PendientesliquidacionComponent,
    LiquidarordenComponent,
    PorestadosotComponent,
    TiempoentregaComponent,
    RetornodocumentarioComponent,
    Retornodocumentario1Component,
    LiquidardocumentosComponent,
    PendientesmanifiestosComponent,
    LiquidaordenotComponent,
    LiquidarComponent,
    AsignarEstibaComponent,
    VerAsignacionComponent,
    LiquidarManifiestoComponent,
    OtroServicioComponent,
    ReportependientesliquidacionComponent,
    ReportependientesdespachoComponent,
    ReportependientesingresosComponent,
    UploadfileComponent,
    ListadoordentransporteclienteComponent,
    SustentospendientesComponent,
    SustentarhrComponent,
    ListadoproveedoresComponent,
    ListadotarifaproveedorComponent,
    NuevatarifaComponent,
    EditartarifaComponent,
    VincularfacturaComponent,
    VincularComponent,
    VerordengeneralComponent,
    ConfirmarentregaComponent,
    UploadModalComponent,
    RepartidorModalComponent,
    ReportecomercialComponent,
    OtspendientesComponent,
    CamModalComponent,
    ListadorepartidoresComponent,
    ListadotarifarepartidorComponent,
    EditartarifarepartidorComponent,
    NuevatarifarepartidorComponent,
    PendientesliquidacionrepartidoresComponent,

    AgrupadoplanningComponent,
    GenerarrutasComponent,
    ModalTipoUnidadComponent,
    ModalAsignaraCargaComponent,
    ModalAsignarTipoOperacionComponent,
    ManifiestoComponent,
    HojarutaComponent,
    AsignarPlacaComponent,
    AgregarOThrModalComponent,
    OperacioncargaComponent,
    OperaciondetalleComponent,
    PrecintosModalComponent,
    DesasignarModalComponent,
    GrtModalComponent,
    ConfirmarEstibaModalComponent,
    ArmadoValijaModalComponent,
    AutorizarEstibaModalComponent,
    EquipostraficoComponent,
    VistaenrutaComponent,
    CambiarEstadoModalComponent,
    ModalReprogramarArribosComponent,
    VistarepartidorComponent,
    EventosModalComponent,
    EntregarOtModalComponent,
    AutorizarReinicioModalComponent,
    ProgramarArribosModalComponent,
    EnvioCargoModalComponent,
    ConfirmarrecepcionComponent






  ],
  exports: [

  ],
  imports: [
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    CalendarModule,
    TableModule,
    ProgressBarModule,
    ButtonModule,
    DropdownModule,
    DragDropModule,
    SweetAlert2Module,
    NgxLoadingModule,
    NgxMaterialTimepickerModule,
    NgbModule,
    ToolbarModule2,
    SplitButtonModule,
    StepsModule,
    SidebarModule,
    ToastModule,
    DynamicDialogModule,
    TooltipModule,
    InputSwitchModule,
    AngularDualListBoxModule,
    TreeviewModule.forRoot(),
    BlockUIModule,
    PanelModule,
    TabViewModule,
    ChartModule,
    MultiSelectModule,
    OverlayPanelModule,
    ConfirmDialogModule,
    CheckboxModule,
    CarouselModule,
    InputNumberModule,
    InputTextareaModule,
    CalendarModule2.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDnh35oUHQYGDPcVs6rfKOY057Xo7ujDsQ'
    }),
    FileUploadModule,
    PickListModule

    // TreeGridModule,
    // GridAllModule,
    // DropDownListModule,
    // ToolbarModule,







  ],
  providers: [DialogService,
    ConfirmationService,
    OrdenTransporteService,
    Data,
    BuscarPlacaComponent,
    BuscarChoferComponent,
    LiquidarComponent,
    VincularComponent,
    AsignarEstibaComponent,
    VerAsignacionComponent,
    DatePipe,
    UploadModalComponent,
    RepartidorModalComponent,
    CamModalComponent




  ],
  entryComponents: [
    FileModalComponent,
    GuiasModalComponent,
    LiquidarComponent,
    VincularComponent,
    LiquidarManifiestoComponent,
    OtroServicioComponent,
    UploadModalComponent,
    ModalTipoUnidadComponent,
    ModalAsignaraCargaComponent,
    ModalAsignarTipoOperacionComponent,
    AsignarPlacaComponent,
    AgregarOThrModalComponent,
    PrecintosModalComponent,
    DesasignarModalComponent,
    GrtModalComponent,
    ConfirmarEstibaModalComponent,
    ArmadoValijaModalComponent,
    AutorizarEstibaModalComponent,
    CambiarEstadoModalComponent,
    ModalReprogramarArribosComponent,
    EventosModalComponent,
    EntregarOtModalComponent,
    AutorizarReinicioModalComponent,
    ProgramarArribosModalComponent,
    EnvioCargoModalComponent



  ],
  bootstrap: [EquipostraficoComponent]
})

export class PagesModule {
}

