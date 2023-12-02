import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Carga } from 'src/app/_models/Seguimiento/guiaremisionblanco';
import { Incidencia, Documento } from 'src/app/_models/Seguimiento/incidencia';
import { OrdenTransporte } from 'src/app/_models/Seguimiento/ordentransporte';
import { User } from 'src/app/_models/user';
import { OrdenTransporteService } from 'src/app/_services/Seguimiento/ordentransporte.service';
import { AsignarPlacaComponent } from '../../planning/generarrutas/modal.asignarplaca';
import { ModalAsignaraCargaComponent } from '../../planning/generarrutas/modalasignaracarga';
import { ModalAsignarTipoOperacionComponent } from '../../planning/generarrutas/modalasignartipooperacion';
import { ModalTipoUnidadComponent } from '../../planning/generarrutas/modaltipounidad';
import { CambiarEstadoModalComponent } from './modalcambiarestado';
import { ModalReprogramarArribosComponent } from './modalreprogramararribos';
import { EventosModalComponent } from './modaleventos';

@Component({
  selector: 'app-vistaenruta',
  templateUrl: './vistaenruta.component.html',
  styleUrls: ['./vistaenruta.component.scss'],
  providers: [ConfirmationService, DialogService, MessageService]
})
export class VistaenrutaComponent implements OnInit {

  ordenes2: OrdenTransporte[] = [];


  ordenes11: OrdenTransporte[] = [];
  ordenes22: OrdenTransporte[] = [];
  ordenes33: OrdenTransporte[] = [];
  ordenes44: OrdenTransporte[] = [];
  ordenes55: OrdenTransporte[] = [];
  ordenes66: OrdenTransporte[] = [];

  despacho: any;



  loading = false;
  cantidadTotal : number = 0;
  pesoTotal : number = 0;
  otsTotal:number = 0;
  bultosTotal: number = 0;
  subtotalTotal: number = 0;

  cantidadTotal1 : number = 0;
  pesoTotal1 : number = 0;
  otsTotal1:number = 0;
  bultosTotal1: number = 0;
  subtotalTotal1: number = 0;


  cantidadTotal2 : number = 0;
  pesoTotal2 : number = 0;
  otsTotal2:number = 0;
  bultosTotal2: number = 0;
  subtotalTotal2: number = 0;


  carga11 = false;
  carga22 = false;
  carga33 = false;
  carga44 = false;
  carga55 = false;
  carga66 = false;

  carga11name = '';
  carga22name = '';
  carga33name = '';
  carga44name = '';
  carga55name = '';
  carga66name = '';


  carga11detalle = '';
  carga22detalle = '';
  carga33detalle = '';
  carga44detalle = '';
  carga55detalle = '';
  carga66detalle = '';




  selectedDepartaments: OrdenTransporte[];
  selectedOTs: OrdenTransporte[]= [];

  constructor( private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService ,
    public dialogService: DialogService,
    private ordenService: OrdenTransporteService) { }

incidencias: Incidencia[] = [];
carga: Carga[] = [];
id: any;

zoom = 16;
ref: DynamicDialogRef;

documentos: Documento[];
cols: any[];
cols2: any[];

cols3: any[];



orden: OrdenTransporte = {};
despachos: OrdenTransporte[] = [];
user: User ;

model: any = {};




ngOnInit() {


  this.user = JSON.parse(localStorage.getItem('user'));
  this.model.idusuariocreacion = this.user.usr_int_id;


  this.cols =
  [
      {header: 'PROVINCIA', field: 'provincia'  ,  width: '120px' },
      {header: 'CANTIDAD', field: 'cantidad' , width: '60px'  },
      {header: 'BULTOS', field: 'bulto'  , width: '60px'   },
      {header: 'PESO', field: 'peso'  ,  width: '60px'  },
      {header: 'VOLUMEN', field: 'volumen'  ,  width: '60px'  },
      {header: 'SUBTOTAL', field: 'subtotal'  ,  width: '60px'  }

  ];

 this.cols2 = [
    { field: 'numcp', header: 'N° OT',  width: '20px'},

    {header: 'BULTOS', field: 'bulto'  , width: '60px'   },
    {header: 'FECHA', field: 'fecharegistro'  , width: '60px'   },
    {header: 'PESO', field: 'peso'  ,  width: '30px'  },
    {header: 'SUBTOTAL', field: 'subtotal'  ,  width: '30px'  },
    {header: 'DESTINO', field: 'destino'  ,  width: '30px'  },
    {header: 'CLIENTE', field: 'razonsocial'  ,  width: '100px'  },
    {header: 'TIPO', field: 'tipooperacion'  ,  width: '100px'  },
    {header: 'ACCIONES', field: 'acciones'  ,  width: '30px'  },
  ];



 this.cols3 = [

  { field: 'nummanifiesto', header: 'Manifiesto',  width: '60px'},
  {header: 'Destino', field: 'provincia'  , width: '90px'   },
  {header: 'Tipo Operación', field: 'tipooperacion'  ,  width: '90px'  },
  {header: 'Destinatario', field: 'repartidor'  ,  width: '120px'  },
  {header: 'Estado', field: 'estado'  ,  width: '90px'  },


  {header: 'Fecha Actual', field: 'fecha_estado_actual'  ,  width: '70px'  },



  {header: 'Fecha de ETA', field: 'fecha_eta'  ,  width: '70px'  },
  {header: 'Dif. Fechas', field: 'diferencia_fechas'  ,  width: '120px'  },
  {header: 'Observación', field: 'observacion_eta'  ,  width: '120px'  },




  {header: 'Peso', field: 'peso'  ,  width: '30px'  },
  {header: 'ACCIONES', field: 'acciones'  ,  width: '30px'  },
];





this.id  = this.activatedRoute.snapshot.params.uid;

this.reloadDetalles() ;



}





volver() {
this.router.navigate(['/trafico/integrado']);
}
planificar(){

}

generar(idcarga: number) {



const ref = this.dialogService.open(AsignarPlacaComponent, {
  header: 'Confirmar Despacho',
  width: '40%',
  height: '450px',
  contentStyle: {'height': '450px', overflow: 'auto',  },
  data : { idcarga }
});
ref.onClose.subscribe(() => {

  this.reloadDetalles();
  this.loading = false;


});



}
eliminarDespacho(idcarga: number) {

  this.model.idcarga = idcarga;

  this.confirmationService.confirm({
    message: '¿Está seguro que desea eliminar el despacho?',
    header: 'Eliminar',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {


        this.ordenService.eliminarDespacho(this.model).subscribe( resp =>  {

          this.reloadDetalles();

        });

      },
      reject: () => {

      }

    });

}


verOT(idordentrabajo: number){

  this.router.navigate(['/seguimiento/verorden', idordentrabajo]);

}

desasignarOT(idordentrabajo: number){

  this.ordenService.DesAsignarProvinciaCarga(idordentrabajo).subscribe(resp=>  {

          this.reloadDetalles();
          this.ordenService.GetAllOrdersGroupProvincias(this.id).subscribe(list => {
          this.ordenes2 = list;

       });
  });


}

crearcarga( ) {

  let ids  = '';
  this.selectedOTs.forEach(element => {
    ids = ids + ',' + element.iddepartamento;

  });


  this.ref = this.dialogService.open(ModalTipoUnidadComponent, {
    data : { ids  },
    header: 'Tipo de unidad a asignar',
    width: '40%',
    contentStyle: { overflow: 'auto' },
    baseZIndex: 10000,

});
  this.ref.onClose.subscribe(() => {
    this.reloadDetalles();
  });


}
verEventos(id) {

  this.ref = this.dialogService.open(EventosModalComponent , {
    data : { id  },
    header: 'Listado de eventos',
    width: '40%',
    contentStyle: { overflow: 'auto' },
    baseZIndex: 10000,

});
  this.ref.onClose.subscribe(() => {
    this.reloadDetalles();
  });

}
agregaracarga() {

  let ids = this.selectedDepartaments;

  this.ref = this.dialogService.open(ModalAsignaraCargaComponent, {
    data : { ids  },
    header: 'Asignar a carga',
    width: '40%',
    contentStyle: { overflow: 'auto' },
    baseZIndex: 10000,
  });

  this.ref.onClose.subscribe((product: any) => {
      this.reloadDetalles();
     });
   }

   reloadDetalles() {

    this.ordenService.GetAllOrdersPendingGroupProvincia(this.id).subscribe(list => {
      this.despachos = list;

      this.model.nombrechofer = this.despachos[0].chofer;
      this.model.numhojaruta = this.despachos[0].numhojaruta;
      this.model.placa = this.despachos[0].placa;

    });



   }
   ModalAsignarTipoOperacionComponent
   quitarSeleccionados() {


    this.selectedOTs.forEach(x=> {
        this.desasignarOT(x.idordentrabajo);

        const index = this.ordenes11.indexOf(x, 0);
        if (index > -1) {
          this.ordenes11.splice(index, 1);
        }

    });

    this.reloadDetalles();


   }



   cambiarTipoOperacion(){

    let ids  = '';

    if(this.selectedOTs.length  === 0 )
      {
        this.toastr.error('Debe seleccionar una o más OTs'
        , 'Planning', {
          closeButton: true
        });
        return ;
      }

    this.selectedOTs.forEach(element => {
      if(element.idordentrabajo === undefined){
        return;
      }

      ids = ids + ',' + element.idordentrabajo;

    });




    this.ref = this.dialogService.open(ModalAsignarTipoOperacionComponent, {
      header: 'Reasignar Recursos',
      width: '50%',
      contentStyle: {overflow: 'auto'},
      baseZIndex: 10000,
      data : {ids }
  });

    this.ref.onClose.subscribe((product: any) => {

      //this.reloadDetalles();
      return ;
    });

  }
   cambiarEstado(){

    let ids  = '';

    if(this.selectedOTs.length  === 0 )
      {
        this.toastr.error('Debe seleccionar una o más OTs'
        , 'Planning', {
          closeButton: true
        });
        return ;
      }

    this.selectedOTs.forEach(element => {
      if(element.idmanifiesto === undefined){
        return;
      }

      ids = ids + ',' + element.idmanifiesto;

    });




    this.ref = this.dialogService.open(CambiarEstadoModalComponent, {
      header: 'Asignar Estado',
      width: '50%',
      contentStyle: {overflow: 'auto'},
      baseZIndex: 10000,
      data : {ids }
  });

    this.ref.onClose.subscribe((product: any) => {

      this.reloadDetalles();

      return ;
    });

  }







   reprogramarArribos(){

    let ids  = '';



    if(this.selectedOTs.length  === 0 )
      {
        this.toastr.error('Debe seleccionar una o más OTs'
        , 'Planning', {
          closeButton: true
        });
        return ;
      }

    this.selectedOTs.forEach(element => {
      if(element.idmanifiesto === undefined){
        return;
      }

      ids = ids + ',' + element.idmanifiesto;

    });


     ids = ids.substring(1, ids.length + 1);

     console.log(ids,'seleccionado');

    this.ref = this.dialogService.open(ModalReprogramarArribosComponent, {
      header: 'Fechas Aproximadas de llegada',
      width: '50%',
      contentStyle: { overflow: 'auto'},
      baseZIndex: 10000,
      data : {ids }
  });

    this.ref.onClose.subscribe((product: any) => {

      //this.reloadDetalles();
      return ;
    });

  }
  ver(despacho){



    this.loading = true;

    this.ordenService.GetAllOrdersCargasTemporal(despacho.data.idcarga).subscribe(resp=>  {

      this.loading = false;

      this.ordenes11 = resp;
      if(resp.length === 0)
      {
        this.toastr.warning('El despacho aún no contiene órdenes' , 'Planning', {   closeButton: true   });
        this.carga11detalle = '';
        return ;
      }

      this.carga11detalle = resp![0].numcarga!;
    });


  }

}

