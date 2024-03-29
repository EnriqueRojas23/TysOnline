import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { SelectItem, MessageService, ConfirmationService } from 'primeng/api';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { OverlayPanel } from 'primeng/overlaypanel';
import { OrdenTransporte } from 'src/app/_models/Seguimiento/ordentransporte';
import { User } from 'src/app/_models/user';
import { OrdenTransporteService } from 'src/app/_services/Seguimiento/ordentransporte.service';

import { MAT_DATE_FORMATS } from '@angular/material/core';
import { DateAdapter } from 'angular-calendar';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/_common/datepicker.extend';
import { AgregarOThrModalComponent } from './modalagregarothr';
import { DesasignarModalComponent } from './modaldesasignar';
import { PrecintosModalComponent } from './modalprecintos';
import { GrtModalComponent } from './modalgrt';
import { ConfirmarEstibaModalComponent } from './modalconfirmarestiba';
import { Rol } from 'src/app/_models/rol';
import { ArmadoValijaModalComponent } from './modalarmadovalija';
import { AutorizarEstibaModalComponent } from './modalautorizarestiba';
import { AutorizarReinicioModalComponent } from './modalautorizarreinicio';

@Component({
  selector: 'app-hojaruta',
  templateUrl: './hojaruta.component.html',
  styleUrls: ['./hojaruta.component.scss'],
  providers: [ConfirmationService, MessageService, DialogService,
    {
        provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ]
})
export class HojarutaComponent implements OnInit {

  clientes: SelectItem[] = [];
  destinatarios: SelectItem[] = [];
  ubigeo: SelectItem[] = [];
  estados: SelectItem[] = [];
  tipotransporte: SelectItem[] = [];
  estado: string = '';

  ordenes: OrdenTransporte[] = [];
  ordenes2: OrdenTransporte[] = [];


  loading: any;
  model: any = {};
  ProveedorLoaded = false;
  UbigeoLoaded = false;
  cols: any[];
  cols2: any[];
  es: any;
  frozenCols: any[];
  user: User ;
  roles : Rol[];
  ref: DynamicDialogRef;
  dateInicio: Date = new Date(Date.now()) ;
  dateFin: Date = new Date(Date.now()) ;
  imageToShow: any;
  esalmacen = false;

  statuses: SelectItem[];
  clonedOrders: { [s: string]: OrdenTransporte; } = {};

  constructor(private ordenTransporteService: OrdenTransporteService,
              public dialogService: DialogService,
              private confirmationService: ConfirmationService,
              public messageService: MessageService
              ) { }

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('user'));
    this.roles = JSON.parse(localStorage.getItem('roles'));


    this.roles.forEach(x=> {
      if(x.rol_int_id === 13)
      {
          this.esalmacen = true;
      }
    })

    this.model.idusuario = this.user.usr_int_id;
    this.dateInicio.setDate((new Date()).getDate() - 10);
    this.dateFin.setDate((new Date()).getDate() );
    this.model.numcp = '';
    this.model.docreferencia = '';
    this.model.grr = '';


    this.cols2 =
    [
        {header: 'ACCIÓN', field: 'idordentrabajo'  ,  width: '105px' },
        {header: 'MANIFIESTO', field: 'nummanifiesto'  ,  width: '105px' },
        {header: 'PROVINCIA', field: 'docgeneral' , width: '90px'  },
        {header: 'TIPO DE OPERACIÓN', field: 'tipooperacion' , width: '200px'  },
        {header: 'ESTADO', field: 'estado'  , width: '90px'   },
        {header: 'ORDEN DE CARGA', field: 'destinatario' , width: '180px'  },
    ];


    this.cols =
    [
        //
        {header: 'PLACA', field: 'placa'  ,  width: '85px' },
        {header: 'CONDUCTOR', field: 'nombrechofer' , width: '120px'  },
        {header: 'HOJA DE RUTA', field: 'numhojaruta' , width: '90px'  },
        {header: 'PROVEEDOR', field: 'proveedor'  , width: '90px'   },
        {header: 'RUTA', field: 'ruta'  , width: '90px'   },
        {header: 'PRECINTOS', field: 'precinto' , width: '90px'  },
        {header: 'ACCIÓN', field: 'idordentrabajo'  ,  width: '120px' },

      ];


        this.buscar();



  }

  ver(id: any){

    this.model = id.data;
    this.loading = true;

            this.ordenTransporteService.getAllPreManifiestos(this.model).subscribe(list =>  {
              let count = 1;
              this.loading = false;


              list.forEach(item => {
                item.idorden = count ++;
              });

              this.ordenes =  list;
              this.estado = list[0].estado;

          });

  }





  buscar() {
      this.model.fec_ini = this.dateInicio;
      this.model.fec_fin = this.dateFin;
      this.loading = true;



      if(this.model.iddestinatario == undefined) {
        this.model.iddestinatario = '';
      }
      this.ordenTransporteService.getAllPreHojaRuta(this.model).subscribe(list =>  {

        this.loading = false;
        this.ordenes2 = list;

        this.ordenes2.forEach(item => {


        if(item.cantidadprecintos > 0)
        {
          item.precinto = 'SI';
        }
        else
        {
          item.precinto = 'NO';
        }




        });




      });
  }
  actualizar() {
    this.buscar();
  }

  agregar() {

    this.ref = this.dialogService.open(AgregarOThrModalComponent, {
      data : { },
      header: 'Agregar OT a Manifiesto',
      width: '50%',
      contentStyle: {'height': '500px', overflow: 'auto'},
      baseZIndex: 10000
  });
  this.ref.onClose.subscribe(  x => {

    this.ordenTransporteService.getAllPreManifiestos(this.model).subscribe(list =>  {
      let count = 1;
      this.loading = false;

      list.forEach(item => {
        item.idorden = count ++;
      });
      this.ordenes =  list;
      this.estado = list[0].estado;
    });
  });



  }
  onRowReorder() {
   let count = 1;

   this.ordenes.forEach(list => {
      list.idorden = count ++;
    });

  }
  armadoValija() {

    var manifiestos = this.ordenes;
    let hojaruta = this.model.numhojaruta;
    this.ref = this.dialogService.open(ArmadoValijaModalComponent, {
      data : { hojaruta, manifiestos },
      header: 'Armado Valija',
      width: '50%',
      contentStyle: {'max-height': '500px', overflow: 'auto'},
      baseZIndex: 10000
   });

  }

  confirmarDespacho() {


    var manifiestos = this.ordenes;
    let hojaruta = this.model.numhojaruta;

    this.ordenTransporteService.getEstibaAutorizada(hojaruta).subscribe(resp => {


                if(!resp){
                  this.messageService.add({severity:'error', summary:'Confirmar Estiba', detail:'No se puede continuar, debe ser a autorizado por el supervisor de turno'});


                        this.ref = this.dialogService.open(AutorizarEstibaModalComponent, {
                          data : { hojaruta, manifiestos },
                          header: 'Confirmar estiba',
                          width: '50%',
                          contentStyle: {'max-height': '500px', overflow: 'auto'},
                          baseZIndex: 10000
                       });
                       return ;


                }


                this.ref = this.dialogService.open(ConfirmarEstibaModalComponent, {
                  data : { hojaruta, manifiestos },
                  header: 'Confirmar estiba',
                  width: '50%',
                  contentStyle: {'max-height': '500px', overflow: 'auto'},
                  baseZIndex: 10000
              });



      });





   //var manifiestos = this.ordenes;
   //let hojaruta = this.model.numhojaruta;


  }

asignarPrecinto() {
  var todo = this.ordenes;

  let hojaruta = this.model.numhojaruta;
  this.ref = this.dialogService.open(PrecintosModalComponent, {
    data : { hojaruta , todo},
    header: 'Asignar Precintos',
    width: '50%',
    contentStyle: {'max-height': '500px', overflow: 'auto'},
    baseZIndex: 10000
 });

//  this.ref.onClose.subscribe(  x => {

//   var resp =  this.ordenTransporteService.confirmarSalida(this.model.numhojaruta).subscribe(resp => {
//     this.ref.close();


//       var url = "http://104.36.166.65/webreports/hojaruta.aspx?iddespacho=" + String(this.ordenes[0].iddespacho);
//       window.open(url);


// });

//});


//});



}
desasignarOts() {

  let hojaruta = this.model.numhojaruta;

  this.ref = this.dialogService.open(DesasignarModalComponent, {
    data : { hojaruta },
    header: 'Desasignar OT',
    width: '50%',
    contentStyle: {'max-height': '500px', overflow: 'auto'},
    baseZIndex: 10000
 });

}
darSalida() {
  this.confirmationService.confirm({
    message: '¿Esta seguro que desea darle salida al vehículo?',
    accept: () => {

      var resp =  this.ordenTransporteService.confirmarSalida(this.model.numhojaruta).subscribe(resp => {
          this.ref.close();


          this.ordenes.forEach ( list => {
            var url = "http://104.36.166.65/webreports/manifiesto.aspx?idmanifiesto=" + String(list.idmanifiesto);
            window.open(url);
          })


            var url = "http://104.36.166.65/webreports/hojaruta.aspx?iddespacho=" + String(this.ordenes[0].iddespacho);
            window.open(url);


      });




    },
    reject: () => {
        this.ref.close();
    }

 });
}
imprimirCarga (){

  let idcarga = this.ordenes[0].idcarga;
  var url = "http://104.36.166.65/webreports/carga.aspx?idcarga=" + String(idcarga);
  window.open(url);



}
imprimirGrt() {

  let hojaruta = this.model.numhojaruta;

  this.ref = this.dialogService.open(GrtModalComponent, {
    data : { hojaruta },
    header: 'Generar GRTs',
    width: '50%',
    contentStyle: {'max-height': '500px', overflow: 'auto'},
    baseZIndex: 10000
 });

//  this.ref.onClose.subscribe(  x => {

//   var resp =  this.ordenTransporteService.confirmarSalida(this.model.numhojaruta).subscribe(resp => {
//     this.ref.close();


//       var url = "http://104.36.166.65/webreports/hojaruta.aspx?iddespacho=" + String(this.ordenes[0].iddespacho);
//       window.open(url);


// });

//});





}


imprimirManifiesto (hojaruta) {

  let permitir = true;
  //validar que todos las ots esten subidas al camion.
  this.ordenTransporteService.getOrdenTransportexHojaRuta(hojaruta).subscribe(list => {

    list.forEach(ot => {

      console.log(ot.despachado);

      if(ot.despachado === false  || ot.despachado === null){
        permitir = false;
      }
      console.log(ot , 'una ot');
    });

  }, error => {

  }, ()=>{

      if(permitir === true)
      {
            this.ordenTransporteService.getAllPreManifiestos(hojaruta).subscribe(list =>  {
              let count = 1;
              this.loading = false;

              console.log(list);



            list.forEach ( item => {
              var url = "http://104.36.166.65/webreports/manifiesto.aspx?idmanifiesto=" + String(item.idmanifiesto);
              window.open(url);
            })


              var url = "http://104.36.166.65/webreports/hojaruta.aspx?iddespacho=" + String(list[0].iddespacho);
              window.open(url);

          });
    }
    else
    {
      this.messageService.add({severity:'error', summary:'No puede continuar', detail:'Existen Ots que no han sido cargadas al camión.'});
    }


  });







}
reiniciarHojaRuta (hojaruta) {


  this.ordenTransporteService.getAutorizaReinicio(hojaruta).subscribe(resp => {

      this.messageService.add({severity:'error', summary:'Reiniciar HR-Manifiestos', detail:'No se puede continuar, debe ser a autorizado por el supervisor de turno'});


      this.ref = this.dialogService.open(AutorizarReinicioModalComponent, {
        data : { hojaruta },
        header: 'Autorizar Reinicio de HR',
        width: '50%',
        contentStyle: {'max-height': '500px', overflow: 'auto'},
        baseZIndex: 10000
     });


    return ;




  });
}


guardar() {


  let idcarga = this.ordenes[0].idcarga;
  this.model.idcarga = idcarga;

  this.confirmationService.confirm({
    message: '¿Esta seguro que desea generar la orden de carga?',
    accept: () => {
      this.loading = true;

        this.ordenTransporteService.confirmarDespacho2(this.model, this.ordenes).subscribe(list => {

        var url = "http://104.36.166.65/webreports/carga.aspx?idcarga=" + String(idcarga);
        window.open(url);

        // var url = "http://104.36.166.65/webreports/guiatransportista.aspx?idcarga=" + String(idcarga);
        // window.open(url);



        this.buscar();

      });
    }
  });


}


}
