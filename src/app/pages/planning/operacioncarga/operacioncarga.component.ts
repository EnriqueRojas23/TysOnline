import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {  ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OrdenTransporte } from 'src/app/_models/Seguimiento/ordentransporte';
import { OrdenTransporteService } from 'src/app/_services/Seguimiento/ordentransporte.service';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { OverlayPanel } from 'primeng/overlaypanel';
import { User } from 'src/app/_models/user';
import { AgregarOThrModalComponent } from '../../seguimiento/hojaruta/modalagregarothr';

@Component({
  selector: 'app-operacioncarga',
  templateUrl: './operacioncarga.component.html',
  styleUrls: ['./operacioncarga.component.scss'],
  providers: [ConfirmationService, DialogService, MessageService]
})
export class OperacioncargaComponent implements OnInit {

  clientes: SelectItem[] = [];
  destinatarios: SelectItem[] = [];
  ubigeo: SelectItem[] = [];
  estados: SelectItem[] = [];
  tipotransporte: SelectItem[] = [];

  ordenes: OrdenTransporte[] = [];
  ordenes2: OrdenTransporte[] = [];


  loading: any;
  model: any = {};
  ProveedorLoaded = false;
  UbigeoLoaded = false;
  cols: any[];
  es: any;
  frozenCols: any[];
  user: User ;
  ref: DynamicDialogRef;
  dateInicio: Date = new Date(Date.now()) ;
  dateFin: Date = new Date(Date.now()) ;
  imageToShow: any;

  statuses: SelectItem[];
  clonedOrders: { [s: string]: OrdenTransporte; } = {};

  constructor(private ordenTransporteService: OrdenTransporteService,
              public dialogService: DialogService,
              private router: Router,
              private toastr: ToastrService,
              public messageService: MessageService
              ) { }

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('user'));

    this.model.idusuario = this.user.usr_int_id;
    this.dateInicio.setDate((new Date()).getDate() - 10);
    this.dateFin.setDate((new Date()).getDate() );
    this.model.numcp = '';
    this.model.docreferencia = '';
    this.model.grr = '';


    this.statuses = [
                     {label: 'Seleccionar', value: '0'},
                     {label: 'Ausente', value: 'Ausente'},
                     {label: 'Falta referencias', value: 'Falta referencias'},
                     {label: 'Faltan datos en la dirección', value: 'Faltan datos en la dirección'},
                     {label: 'No hay acceso a la zona', value: 'No hay acceso a la zona'},
                     {label: 'No lo conocen', value: 'No lo conocen'},
                     {label: 'No visitado', value: 'No visitado'},
                     {label: 'Se mudó', value: 'Se mudó'},
                     {label: 'Se negó a recibir', value: 'Se negó a recibir'},
                    ]

    this.cols =
    [


        {header: 'ACCIÓN', field: 'idordentrabajo'  ,  width: '105px' },
        {header: 'MANIFIESTO', field: 'idordentrabajo'  ,  width: '105px' },
        {header: 'HOJA DE RUTA', field: 'docgeneral' , width: '90px'  },
        {header: 'TIPO DE OPERACIÓN', field: 'tipooperacion' , width: '200px'  },
        {header: 'ESTADO', field: 'estado'  , width: '90px'   },
        {header: 'ORDEN DE CARGA', field: 'destinatario' , width: '180px'  },



      ];



    this.es = {
      firstDayOfWeek: 1,
      dayNames: [ 'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' ],
      dayNamesShort: [ 'dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb' ],
      dayNamesMin: [ 'D', 'L', 'M', 'X', 'J', 'V', 'S' ],
      monthNames: [ 'enero', 'febrero', 'marzo', 'abril',
       'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre' ],
      monthNamesShort: [ 'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic' ],
      today: 'Hoy',
      clear: 'Borrar'
  };


        this.buscar();



  }

  onRowEditInit(order: OrdenTransporte) {
    this.clonedOrders[order.idordentrabajo] = {...order};
  }


  onRowEditSave(order: OrdenTransporte) {
    if (order.idordentrabajo > 0) {
        delete this.clonedOrders[order.idordentrabajo];



        this.ordenTransporteService.update_Visitas(order).subscribe( resp => {


          this.toastr.success('Se actualizó correctamente'
          , 'Orden de Transporte', {
            closeButton: true
          });


        });


    }
    else {
      this.toastr.error('No se actualizó correctamente'
      , 'Orden de Transporte', {
        closeButton: true
      });
    }
}

onRowEditCancel(order: OrdenTransporte, index: number) {
    this.ordenes2[index] = this.clonedOrders[order.idordentrabajo];
    delete this.ordenes2[order.idordentrabajo];
}
  exportExcel() {
    this.model.fec_ini =  moment(this.dateInicio).format('DD/MM/YYYY');
    this.model.fec_fin = moment(this.dateFin).format('DD/MM/YYYY');
    let iddestino = '';
    if (this.model.iddestino === undefined){
      iddestino = '';
    }
    else {
      iddestino = String(this.model.iddestino);
    }

    const url = 'http://104.36.166.65/webreports/consultaots.aspx?idcliente=' + String(this.model.idcliente) +
    '&fecinicio=' + this.model.fec_ini +  '&fecfin=' + this.model.fec_fin +   '&numcp=' + this.model.numcp +
    '&docreferencia=' + this.model.docreferencia +  '&grr=' + this.model.grr +   '&iddestino=' + iddestino +
    '&idestado=' + String(this.model.idestado)  + '&idusuario=' + this.model.idusuario;

    window.open(url);
  }

  verdetalles(id) {
     this.router.navigate(['/seguimiento/verorden', id]);
  }


  buscar() {
      this.model.fec_ini = this.dateInicio;
      this.model.fec_fin = this.dateFin;
      this.loading = true;

      if(this.model.iddestinatario == undefined) {
        this.model.iddestinatario = '';
      }
      this.ordenTransporteService.getAllOperaciones(this.model).subscribe(list =>  {

        let count = 1;
        this.loading = false;
        this.ordenes =  list;
        this.ordenes2 = list;

        this.ordenes2.forEach(list => {
          list.idorden = count ++;
        });

      });
  }
  getFiles(id, event, overlaypanel: OverlayPanel) {
    this.ordenTransporteService.getAllDocumentos(id).subscribe(list => {
        this.downloadFile(list[2].id);
        overlaypanel.toggle(event);
   });
  }
  agregar() {

    this.ref = this.dialogService.open(AgregarOThrModalComponent, {
      data : { },
      header: 'Agregar OT a Manifiesto',
      width: '50%',
      contentStyle: {'height': '500px', overflow: 'auto'},
      baseZIndex: 10000
  });

  }
  onRowReorder() {
   let count = 1;
    console.log(this.ordenes2);

    this.ordenes2.forEach(list => {

      list.idorden = count ++;

    });


  }
  downloadFile(documentoId: number) {

    this.ordenTransporteService.downloadDocumento(documentoId).subscribe(
       (response: any) => {
           const dataType = response.type;
           const binaryData = [];
           binaryData.push(response);
           const downloadLink = document.createElement('a');
           downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
          // document.body.appendChild(downloadLink);
           // downloadLink.click();
           this.createImageFromBlob(new Blob(binaryData, {type: dataType}));

           // window.open(downloadLink.href);
       }
     );
   }
   createImageFromBlob(image: Blob) {

    const reader = new FileReader();
    reader.addEventListener('load', () => {
       this.imageToShow = reader.result;
       console.log(reader.result);

    }, false);

    if (image) {
       reader.readAsDataURL(image);
    }
 }




}

