import { ListadotarifarepartidorComponent } from './seguimiento/tarifas/listadotarifarepartidor/listadotarifarepartidor.component';
import { ListadorepartidoresComponent } from './seguimiento/tarifas/listadorepartidores/listadorepartidores.component';
import { PendientesliquidacionrepartidoresComponent } from './seguimiento/liquidacion/pendientesliquidacionrepartidores/pendientesliquidacionrepartidores.component';
import { NuevatarifarepartidorComponent } from './seguimiento/tarifas/nuevatarifarepartidor/nuevatarifarepartidor.component';
import { OtspendientesComponent } from './seguimiento/retorno/otspendientes/otspendientes.component';
import { ReportecomercialComponent } from './kpis/reportecomercial/reportecomercial.component';
import { VincularfacturaComponent } from './seguimiento/liquidacion/vincularfactura/vincularfactura.component';
import { EditartarifaComponent } from './seguimiento/proveedores/editartarifa/editartarifa.component';
import { NuevatarifaComponent } from './seguimiento/proveedores/nuevatarifa/nuevatarifa.component';
import { SustentarhrComponent } from './seguimiento/sustentos/sustentarhr/sustentarhr.component';
import { SustentospendientesComponent } from './seguimiento/sustentos/sustentospendientes/sustentospendientes.component';
import { ListadoordentransporteclienteComponent } from './seguimiento/ordentransporte/listadoordentransportecliente/listadoordentransportecliente.component';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../_guards/auth.guard';

import { ListadoordentransporteComponent } from './seguimiento/ordentransporte/listadoordentransporte/listadoordentransporte.component';
import { VerordenComponent } from './seguimiento/ordentransporte/verorden/verorden.component';
import { IndexComponent } from './index/index.component';
import { ListadoordenesrecojoComponent } from './seguimiento/ordenesrecojo/listadoordenesrecojo/listadoordenesrecojo.component';
import { NuevaordenrecojoComponent } from './seguimiento/ordenesrecojo/nuevaordenrecojo/nuevaordenrecojo.component';
import { AsignarequipotransporteComponent } from './seguimiento/ordenesrecojo/asignarequipotransporte/asignarequipotransporte.component';
import { EditarordenrecojoComponent } from './seguimiento/ordenesrecojo/editarordenrecojo/editarordenrecojo.component';
import { ProgramacionplacaComponent } from './seguimiento/ordenesrecojo/programacionplaca/programacionplaca.component';
import { ListadoplacasprogramadasComponent } from './seguimiento/ordenesrecojo/listadoplacasprogramadas/listadoplacasprogramadas.component';
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
import { ReportependientesliquidacionComponent } from './reportes/reportependientesliquidacion/reportependientesliquidacion.component';
import { ReportependientesdespachoComponent } from './reportes/reportependientesdespacho/reportependientesdespacho.component';
import { ReportependientesingresosComponent } from './reportes/reportependientesingresos/reportependientesingresos.component';
import { UploadfileComponent } from './seguimiento/ordentransporte/uploadfile/uploadfile.component';
import { ListadoproveedoresComponent } from './seguimiento/proveedores/listadoproveedores/listadoproveedores.component';
import { ListadotarifaproveedorComponent } from './seguimiento/proveedores/listadotarifaproveedor/listadotarifaproveedor.component';
import { ConfirmarentregaComponent } from './seguimiento/ordentransporte/confirmarentrega/confirmarentrega.component';



const pagesRoutes: Routes = [
    {path : 'seguimientoot/listadoparaclientes', component : ListadoordentransporteclienteComponent, canActivate: [AuthGuard]} ,
    {path : 'seguimientoot/listadoordentransporte', component : ListadoordentransporteComponent, canActivate: [AuthGuard]} ,
    {path : 'seguimientoot/confirmarentregas', component : ConfirmarentregaComponent , canActivate: [AuthGuard]} ,




    {path : 'seguimiento/verorden/:uid', component : VerordenComponent, canActivate: [AuthGuard]} ,

    {path : 'sustentos/listadopendientes', component : SustentospendientesComponent, canActivate: [AuthGuard]} ,
    {path : 'sustentos/sustentarhr/:uid', component : SustentarhrComponent, canActivate: [AuthGuard]} ,



    {path : 'dashboard', component : IndexComponent, canActivate: [AuthGuard]} ,
    {path : 'seguimiento/ordenrecojo', component : ListadoordenesrecojoComponent  , canActivate: [AuthGuard]} ,
    {path : 'seguimiento/nuevaordenrecojo', component : NuevaordenrecojoComponent  , canActivate: [AuthGuard]} ,
    {path : 'seguimiento/asignarequipotransporte/:uid', component : AsignarequipotransporteComponent  , canActivate: [AuthGuard]} ,
    {path : 'seguimiento/editarordenrecojo/:uid', component : EditarordenrecojoComponent  , canActivate: [AuthGuard]} ,
    {path : 'seguimiento/programacionplaca/:uid', component : ProgramacionplacaComponent  , canActivate: [AuthGuard]} ,
    {path : 'seguimiento/listadoplacasprogramadas', component : ListadoplacasprogramadasComponent  , canActivate: [AuthGuard]} ,
    {path : 'seguimiento/asignarguias', component : AsignarguiasComponent  , canActivate: [AuthGuard]} ,
    {path : 'seguimiento/liquidaciondocumentaria', component : PendientesliquidacionComponent  , canActivate: [AuthGuard]} ,

    {path : 'seguimiento/vincularfacura', component : VincularfacturaComponent  , canActivate: [AuthGuard]} ,


    {path : 'seguimiento/liquidarorden/:uid/:uid2', component : LiquidarordenComponent  , canActivate: [AuthGuard]} ,
    {path : 'seguimiento/uploadfile', component : UploadfileComponent  , canActivate: [AuthGuard]} ,

    {path : 'mantenimiento/listadoproveedores' , component : ListadoproveedoresComponent  , canActivate: [AuthGuard]},
    {path : 'proveedor/listadoproveedorestarifa/:uid' , component : ListadotarifaproveedorComponent },
    {path : 'proveedor/nuevatarifa/:uid' , component : NuevatarifaComponent },
    {path : 'proveedor/editartarifa/:uid/:uid2' , component : EditartarifaComponent },


    // {path : 'mantenimiento/listadoproveedores' , component : ListadoproveedoresComponent  , canActivate: [AuthGuard]},
    // {path : 'proveedor/listadoproveedorestarifa/:uid' , component : ListadotarifaproveedorComponent },
    // {path : 'proveedor/nuevatarifa/:uid' , component : NuevatarifaComponent },
    // {path : 'proveedor/editartarifa/:uid/:uid2' , component : EditartarifaComponent },


    {path : 'proveedor/listadorepartidores' , component : ListadorepartidoresComponent  , canActivate: [AuthGuard]},
    {path : 'proveedor/listadotarifarepartidor/:uid' , component : ListadotarifarepartidorComponent },
    {path : 'proveedor/nuevatarifarepartidor/:uid' , component : NuevatarifarepartidorComponent },
    {path : 'proveedor/editartarifa/:uid/:uid2' , component : EditartarifaComponent },


    {path : 'seguimiento/pendientesliquidacionrepartidores' , component : PendientesliquidacionrepartidoresComponent  , canActivate: [AuthGuard]},



    {path : 'seguimiento/liquidarordenot/:uid/:uid2', component : LiquidaordenotComponent  , canActivate: [AuthGuard]} ,

    {path : 'seguimiento/asignarguias/:uid/:uid2', component : AsignarguiasComponent  , canActivate: [AuthGuard]} ,
    {path : 'seguimiento/pendientesmanifiestos/:uid', component : PendientesmanifiestosComponent  , canActivate: [AuthGuard]} ,

    {path : 'seguimiento/liquidardocumentos/:uid/:uid2/:uid3', component : LiquidardocumentosComponent  , canActivate: [AuthGuard]} ,
    {path : 'kpi/porestadoot', component : PorestadosotComponent  , canActivate: [AuthGuard]} ,

    {path : 'retorno/otspendientes', component : OtspendientesComponent  , canActivate: [AuthGuard]} ,



    {path : 'kpi/tiempoentrega', component : TiempoentregaComponent  , canActivate: [AuthGuard]} ,
    {path : 'kpi/retornodocumentario', component : RetornodocumentarioComponent  , canActivate: [AuthGuard]} ,
    {path : 'kpi/retornodocumentario1', component : Retornodocumentario1Component  , canActivate: [AuthGuard]} ,
    {path : 'kpi/reportecomercial', component : ReportecomercialComponent  , canActivate: [AuthGuard]} ,

    {path : 'reportes/reportependientesliquidacion', component : ReportependientesliquidacionComponent  , canActivate: [AuthGuard]} ,
    {path : 'reportes/reportependientesdespacho', component : ReportependientesdespachoComponent  , canActivate: [AuthGuard]} ,
    {path : 'reportes/reportependientesingresos', component : ReportependientesingresosComponent  , canActivate: [AuthGuard]} ,

    {path : '', redirectTo : 'seguimientoot/listadoparaclientes' , canActivate: [AuthGuard]},

];
export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );






