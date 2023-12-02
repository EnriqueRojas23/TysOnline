import { Component, OnInit } from '@angular/core';
import {cloneDeep} from 'lodash';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Carga } from 'src/app/_models/Seguimiento/guiaremisionblanco';
import { Incidencia, Documento } from 'src/app/_models/Seguimiento/incidencia';
import { OrdenTransporte } from 'src/app/_models/Seguimiento/ordentransporte';
import { OrdenTransporteService } from 'src/app/_services/Seguimiento/ordentransporte.service';
import { ModalTipoUnidadComponent } from './modaltipounidad';
import { ModalAsignaraCargaComponent } from './modalasignaracarga';
import { ModalAsignarTipoOperacionComponent } from './modalasignartipooperacion';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AsignarPlacaComponent } from './modal.asignarplaca';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-generarrutas',
  templateUrl: './generarrutas.component.html',
  styleUrls: ['./generarrutas.component.scss'],
  providers: [ConfirmationService, DialogService, MessageService]
})
export class GenerarrutasComponent implements OnInit {

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
  { field: 'numcarga', header: 'N° Despacho',  width: '60px'},
  {header: 'Tipo de Unidad', field: 'tipounidad'  , width: '60px'   },
  {header: 'Planificador', field: 'planificador'  ,  width: '90px'  },
  {header: 'Estado', field: 'estado'  ,  width: '90px'  },
  {header: 'Fecha de Registro', field: 'fecharegistro'  ,  width: '70px'  },
  {header: 'Peso', field: 'peso'  ,  width: '30px'  },
  {header: 'Volumen', field: 'volumen'  ,  width: '60px'  },
  {header: 'SubTotal', field: 'subtotal'  ,  width: '60px'  },
  {header: 'ACCIONES', field: 'acciones'  ,  width: '60px'  },
];





this.id  = this.activatedRoute.snapshot.params.uid;

    this.ordenService.GetAllOrdersGroupProvincias(this.id).subscribe(list => {
      this.ordenes2 = list;

      this.ordenes2.forEach(obj => {

        this.otsTotal =  this.otsTotal + obj.cantidad;
        this.bultosTotal =  this.bultosTotal + obj.bulto;
        this.pesoTotal =  this.pesoTotal + obj.peso;
        this.subtotalTotal = this.subtotalTotal  + obj.subtotal;

     });



    });

this.reloadDetalles();



}





volver() {
this.router.navigate(['/seguimiento/listadoordentransporte']);
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

    this.selectedOTs = [];

    this.ordenService.GetAllOrdersGroupProvincias(this.id).subscribe(list => {
      this.ordenes2 = list;


    });


    this.ordenService.GetAllCargasTemporal().subscribe(list1 => {

    this.despachos = list1;


     });



   }

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
   quitarNoSeleccionados() {

        var ordenes = cloneDeep(this.ordenes11);


        ordenes.forEach(item => {
              var existe =   this.selectedOTs.find(x=> x.idordentrabajo == item.idordentrabajo);

              if(existe === undefined) {
                this.desasignarOT(item.idordentrabajo);

                const index = this.ordenes11.indexOf(item, 0);
                this.ordenes11.splice(index, 1);

              }
        });

        //this.reloadDetalles();

       // this.ver(this.despacho);

   }

   asignarTipoOperacion(){

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
      header: 'Asignar Tipo de Operación',
      width: '50%',
      contentStyle: {'height': '350px', overflow: 'auto'},
      baseZIndex: 10000,
      data : {ids }
  });

    this.ref.onClose.subscribe((product: any) => {

      this.reloadDetalles();
      return ;
    });

  }
  ver(despacho){

    this.despacho = despacho;

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

