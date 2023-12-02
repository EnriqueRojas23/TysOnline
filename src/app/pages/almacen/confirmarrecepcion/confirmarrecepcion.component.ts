import { GeneralService } from './../../../_services/Mantenimiento/general.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
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
import { EnvioCargoModalComponent } from '../../trafico/vistarepartidor/modalenviocargoOT';
import { ProgramarArribosModalComponent } from '../../trafico/vistarepartidor/modalProgramarArribos';
import { EntregarOtModalComponent } from '../../trafico/vistarepartidor/modalentregarOT';
import { EventosModalComponent } from '../../trafico/vistaenruta/modaleventos';
import { CambiarEstadoModalComponent } from '../../trafico/vistaenruta/modalcambiarestado';
import { ModalReprogramarArribosComponent } from '../../trafico/vistaenruta/modalreprogramararribos';



@Component({
  selector: 'app-confirmarrecepcion',
  templateUrl: './confirmarrecepcion.component.html',
  styleUrls: ['./confirmarrecepcion.component.scss'],
  providers: [ConfirmationService, DialogService, MessageService]
})
export class ConfirmarrecepcionComponent implements OnInit {

  ordenes2: OrdenTransporte[] = [];
  ordenes3: OrdenTransporte[] = [];
  ordenes4: OrdenTransporte[] = [];


  ordenes11: OrdenTransporte[] = [];
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


  NameRepartidor = '';
  NameProvincia ='';


  selectedDepartaments: OrdenTransporte[];
  selectedOTs: OrdenTransporte= {};
  SelectedOrdenTransporte?: OrdenTransporte | undefined;
  SelectedOrdenTransporte2?: OrdenTransporte | undefined;

  constructor( private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService ,
    private generalService: GeneralService ,
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
cols4: any[];
cols5: any[];



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
    { field: 'numcp', header: 'N° OT',  width: '40px'},
    {header: 'FECHA RECOJO', field: 'fecharegistro'  , width: '60px'   },
    {header: 'CLIENTE', field: 'razonsocial'  ,  width: '100px'  },
    {header: 'DESTINATARIO', field: 'destinatario'  , width: '60px'   },


    {header: 'F. ENTREGA REPARTIDOR', field: 'fecha_estado_actual'  ,  width: '90px'  },
    {header: 'F. ENTREGA COMPROMETIDA', field: 'fechaentrega'  , width: '90px'   },
    {header: 'Dif. Fechas', field: 'diferencia_fechas'  ,  width: '20px'  },

    {header: 'BULTOS', field: 'bulto'  , width: '30px'   },
    {header: 'PESO', field: 'peso'  ,  width: '30px'  },
    {header: 'ESTADO', field: 'destino'  ,  width: '30px'  },

  ];



 this.cols3 = [
  { field: 'placa', header: 'Placa',  width: '60px'},
  { field: 'conductor', header: 'Conductor',  width: '120px'},
  { field: 'numhojaruta', header: 'HR',  width: '60px'},
  { field: 'nummanifiesto', header: 'Manifiesto',  width: '60px'},
  {header: 'Destino', field: 'provincia'  , width: '90px'   },

  {header: 'Tipo Operación', field: 'tipooperacion'  ,  width: '90px'  },
  {header: 'Estado', field: 'estado'  ,  width: '90px'  },
  {header: 'Fec. último estado', field: 'fecharegistro'  ,  width: '70px'  },
  {header: 'Observación', field: 'observacion'  ,  width: '70px'  },


  {header: 'Fecha Actual', field: 'fecha_estado_actual'  ,  width: '70px'  },
  {header: 'Dif. Fechas', field: 'diferencia_fechas'  ,  width: '120px'  },



  {header: 'Peso', field: 'peso'  ,  width: '30px'  },
  {header: 'ACCIONES', field: 'acciones'  ,  width: '30px'  }

];

this.cols4 = [
  { field: 'numcp', header: 'N° OT',  width: '40px'},
  {header: 'FECHA RECOJO', field: 'fecharegistro'  , width: '60px'   },
  {header: 'CLIENTE', field: 'razonsocial'  ,  width: '100px'  },
  {header: 'DESTINATARIO', field: 'destinatario'  , width: '60px'   },
  {header: 'F. ENTREGA', field: 'fechaentrega'  , width: '120px'   },
  {header: 'F. RECOJO CARGO COMPROMETIDA', field: 'fechaentrega'  , width: '120px'   },
  {header: 'Observación', field: 'observacion'  ,  width: '70px'  },


  {header: 'ESTADO', field: 'destino'  ,  width: '30px'  },

];

this.cols5 = [
  { field: 'numcp', header: 'N° OT',  width: '40px'},
  {header: 'FECHA RECOJO', field: 'fecharegistro'  , width: '60px'   },
  {header: 'CLIENTE', field: 'razonsocial'  ,  width: '100px'  },
  {header: 'DESTINATARIO', field: 'destinatario'  , width: '60px'   },
  {header: 'F. ENTREGA', field: 'fechaentrega'  , width: '120px'   },
  {header: 'F. ENVÍO COMPROMETIDA', field: 'fechaentrega'  , width: '120px'   },
  {header: 'Observación', field: 'observacion'  ,  width: '70px'  },


  {header: 'ESTADO', field: 'destino'  ,  width: '30px'  },

];




this.id  = this.activatedRoute.snapshot.params.uid;

this.reloadDetalles();



}
modalDatosEnvioOt() {



const idorden = this.SelectedOrdenTransporte.idordentrabajo;


const ref = this.dialogService.open(EnvioCargoModalComponent, {
  header: 'Confirmar entrega',
  width: '50%',
  height: '450px',
  contentStyle: {'height': '550px', overflow: 'auto',  },
  data : { idorden }
});
ref.onClose.subscribe(() => {

  this.reloadDetalles();
  this.loading = false;


});


}
modalActualizarCargoPendiente() {

  this.confirmationService.confirm({
    message: '¿Está seguro que desea confirmar el recojo del cargo?',
    accept: () => {


      this.loading = true;

      this.model.idordentrabajo = this.SelectedOrdenTransporte2.idordentrabajo;

      this.ordenService.actualizar_cargo (this.model).subscribe(list => {

        this.reloadDetalles();
        this.loading = false;


      });




    },
    reject: () => {
        this.ref.close();
    }

 });

}

modalActualizarETA2() {

  const idorden = this.SelectedOrdenTransporte2.idordentrabajo;




const ref = this.dialogService.open(ProgramarArribosModalComponent, {
  header: 'Programar Arribos',
  width: '50%',
  height: '550px',
  contentStyle: {'height': '350px', overflow: 'auto',  },
  data : { idorden }
});
ref.onClose.subscribe(() => {

  this.reloadDetalles();
  this.loading = false;


});
}
modalActualizarETA() {

  const idorden = this.SelectedOrdenTransporte.idordentrabajo;

  console.log(this.SelectedOrdenTransporte, 'Enrique');


const ref = this.dialogService.open(ProgramarArribosModalComponent, {
  header: 'Programar Arribos',
  width: '50%',
  height: '550px',
  contentStyle: {'height': '350px', overflow: 'auto',  },
  data : { idorden }
});
ref.onClose.subscribe(() => {

  this.reloadDetalles();
  this.loading = false;


});
}

modalEntregarOT() {

const idorden = this.SelectedOrdenTransporte.idordentrabajo;


const ref = this.dialogService.open(EntregarOtModalComponent, {
  header: 'Confirmar entrega',
  width: '50%',
  height: '550px',
  contentStyle: {'height': '550px', overflow: 'auto',  },
  data : { idorden }
});
ref.onClose.subscribe(() => {

  this.reloadDetalles();
  this.loading = false;


});




}




volver() {
this.router.navigate(['/trafico/integrado']);
}
planificar() {

}



verOT(idordentrabajo: number){
  this.router.navigate(['/seguimiento/verorden', idordentrabajo]);
}


   reloadDetalles() {



    this.ordenService.GetOrdenTransporteByNumero (this.model.numcp).subscribe(list => {

      console.log(list);

      this.ordenes2 = list;
      //this.NameRepartidor =   this.despachos[0].repartidor;

    });




   }




   cambiarTipoOperacion(){



    if(this.selectedOTs  === undefined )
      {
        this.toastr.error('Debe seleccionar una o más OTs'
        , 'Planning', {
          closeButton: true
        });
        return ;
      }


      let ids  = this.selectedOTs;

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
  verEventos(id){
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
   cambiarEstado(){


    console.log(this.selectedOTs);


    let ids  = ',' + this.selectedOTs.idmanifiesto  ;
    if(this.selectedOTs  === undefined )
      {
        this.toastr.error('Debe seleccionar una o más OTs'
        , 'Planning', {
          closeButton: true
        });
        return ;
      }


    this.ref = this.dialogService.open(CambiarEstadoModalComponent, {
      header: 'Asignar Estado',
      width: '50%',
      contentStyle: {overflow: 'auto'},
      baseZIndex: 10000,
      data : {ids  }
  });

    this.ref.onClose.subscribe((product: any) => {

      this.reloadDetalles();
      return ;
    });

  }








   reprogramarArribos(){

    let ids  =    this.selectedOTs  ;

    if(this.selectedOTs  === undefined )
      {
        this.toastr.error('Debe seleccionar una o más OTs'
        , 'Planning', {
          closeButton: true
        });
        return ;
      }




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

  mostrarOT(){
    this.ordenService.getOrden( this.SelectedOrdenTransporte.idordentrabajo ).subscribe (resp => {
      console.log(resp);
    })
  }
  cargarOT(){

     this.ordenService.getAllOrdersxManifiesto(this.selectedOTs.idmanifiesto).subscribe(x => {
       this.ordenes2 = x;
       this.model.nummanifiesto = this.ordenes2[0].nummanifiesto;
       this.model.numhojaruta = this.ordenes2[0].numhojaruta;

     });
  }


}

