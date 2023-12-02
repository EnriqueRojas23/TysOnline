import { Component, OnInit } from '@angular/core';



import * as moment from 'moment';
// import * as XLSX from 'xlsx';
// import * as FileSaver from 'file-saver';
import { User } from 'src/app/_models/user';


import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/_common/datepicker.extend';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OrdenTransporteService } from 'src/app/_services/Seguimiento/ordentransporte.service';
import { OrdenTransporte } from 'src/app/_models/Seguimiento/ordentransporte';
import { Router } from '@angular/router';
import { OverlayPanel } from 'primeng/overlaypanel';

import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';



@Component({
  selector: 'app-agrupadoplanning',
  templateUrl: './agrupadoplanning.component.html',
  styleUrls: ['./agrupadoplanning.component.scss'],
  providers: [ConfirmationService, MessageService, DialogService,
    {
        provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
    ]
})
export class AgrupadoplanningComponent implements OnInit {

  clientes: SelectItem[] = [];
  destinatarios: SelectItem[] = [];
  ubigeo: SelectItem[] = [];
  estados: SelectItem[] = [];
  tipotransporte: SelectItem[] = [];

  ordenes: OrdenTransporte[] = [];
  ordenes2: OrdenTransporte[] = [];

  selectedDepartaments: OrdenTransporte[] = [];


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
  estaciones: SelectItem[] = [];

  statuses: SelectItem[];
  clonedOrders: { [s: string]: OrdenTransporte; } = {};

  cantidadTotal : number = 0;
  pesoTotal : number = 0;
  otsTotal:number = 0;
  bultosTotal: number = 0;
  subtotalTotal : number = 0;
  rowGroupMetadata: any;

  lat = -12.0608335;
  lng = -76.9347693 ;

  lat2 = -16.3988900;
  lng2 = -71.5350000 ;


  zoom = 6;

  constructor(private ordenTransporteService: OrdenTransporteService,
              public dialogService: DialogService,
              private router: Router,
              private toastr: ToastrService,
              private datePipe :DatePipe,
              public generalService: GeneralService,
              public messageService: MessageService
              ) { }

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('user'));


    this.model.idusuario = this.user.usr_int_id;
    this.dateInicio.setDate((new Date()).getDate() - 1);
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
        // {header: 'ACC', field: 'numcp'  ,  width: '60px' },
        {header: 'ZONA', field: 'zona'  ,  width: '120px' },
        {header: 'DEPARTAMENTO', field: 'departamento'  ,  width: '120px' },
        {header: '# GUÏAS', field: 'cantidad' , width: '60px'  },
        {header: 'BULTOS', field: 'bulto'  , width: '60px'   },
        {header: 'PESO', field: 'peso'  ,  width: '60px'  },
        {header: 'VOLUMEN', field: 'volumen'  ,  width: '60px'  },
        {header: 'SUBTOTAL', field: 'subtotal'  ,  width: '60px'  }

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


  this.generalService.GetAllEstaciones().subscribe(resp => {
    resp.forEach(element => {
      this.estaciones.push({ value: element.idestacion ,  label : element.estacionorigen});
    });
  }, (error) => {

  }, () => {
    this.model.idestacionorigen =  this.user.idestacionorigen;
  });


      this.ordenTransporteService.getClientes(this.user.idclientes).subscribe(resp => {

          this.clientes.push({ value: 0,  label : 'TODOS LOS CLIENTES'});

          resp.forEach(element => {
              this.clientes.push({ value: element.idcliente ,  label : element.razonsocial});
            });

          this.ProveedorLoaded = true;
          this.model.idcliente = 0;



    this.ordenTransporteService.getUbigeo('').subscribe(resp => {

        this.ubigeo.push({ value: 0,  label : 'TODOS LOS DESTINOS'});

        resp.forEach(element => {
            this.ubigeo.push({ value: element.iddistrito ,  label : element.ubigeo});
          });

        this.UbigeoLoaded = true;
        this.model.iddistrito = 0;

      }, error => {

      }, () => {
        this.buscar();
      });
    });
    this.estados.push({ value: 0,  label : 'TODOS LOS ESTADOS'});
    this.estados.push({ value: 1,  label : 'Por Despachar'});
    this.estados.push({ value: 2,  label : 'Por Entregar'});
    this.estados.push({ value: 3,  label : 'Entregado'});
    this.model.idestado = 0;

    this.tipotransporte.push({ value: 0,  label : 'TODOS LOS TIPOS'});
    this.tipotransporte.push({ value: 58,  label : 'Aéreo'});
    this.tipotransporte.push({ value: 59,  label : 'Terrestre'});
    this.tipotransporte.push({ value: 60,  label : 'Fluvial'});



  }

  cargarfiles(id) {


}

  cargarDestinatarios(event) {
    this.destinatarios = [];
    this.destinatarios.push({ value: 0,  label : 'TODOS LOS DESTINATARIOS'});

    this.destinatarios.push({ value: this.model.idcliente,  label : 'MISMO CLIENTE'});

    this.ordenTransporteService.getDestinatarios(this.model.idcliente).subscribe(resp => {
      resp.forEach(item => {
      this.destinatarios.push ({ label: item.razonsocial , value : item.idproveedor});
    });
  });
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
  verarchivos(id) {


  }
  verdetalles(id) {
     this.router.navigate(['/seguimiento/verorden', id]);
  }
  verguias(id) {

  }
  planificar () {

      let ids  = '';

      this.selectedDepartaments.forEach(element => {
        ids = ids + ',' + element.iddepartamento;

      });

      this.router.navigate(['/planning/generarrutas', ids]);

  }


  buscar() {
      this.model.fec_ini = this.dateInicio;
      this.model.fec_fin = this.dateFin;
      this.loading = true;

      if(this.model.iddestinatario == undefined) {
        this.model.iddestinatario = '';
      }


      this.ordenTransporteService.GetAllOrdersGroupDepartament(this.model).subscribe(list =>  {
        this.loading = false;
        this.ordenes =  list;
        this.ordenes2 = list;


            this.ordenes2.forEach(obj => {

               this.otsTotal =  this.otsTotal + obj.cantidad;
               this.bultosTotal =  this.bultosTotal + obj.bulto;
               this.pesoTotal =  this.pesoTotal + obj.peso;
               this.subtotalTotal = this.subtotalTotal + obj.subtotal;

            });

      });
  }

  onSort() {
    this.updateRowGroupMetaData();
  }

  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};
    if (this.ordenes) {
        for (let i = 0; i < this.ordenes.length; i++) {
            const rowData = this.ordenes[i];
            const brand = rowData.zona;
            if (i === 0) {
                this.rowGroupMetadata[brand] = { index: 0, size: 1 };
            }
            else {
                const previousRowData = this.ordenes[i - 1];
                const previousRowGroup = previousRowData.zona;
                if (brand === previousRowGroup) {
                    this.rowGroupMetadata[brand].size++;
                }
                else {
                    this.rowGroupMetadata[brand] = { index: i, size: 1 };
                }
            }
        }
    }
}

  getFiles(id, event, overlaypanel: OverlayPanel) {
    this.ordenTransporteService.getAllDocumentos(id).subscribe(list => {
        this.downloadFile(list[2].id);
        overlaypanel.toggle(event);
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

           this.createImageFromBlob(new Blob(binaryData, {type: dataType}));

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



function getIdVisita(motivo1des: string): number {
  if (motivo1des === "Ausente"  )
  {
     return 27;
  }
  if (motivo1des === "Falta referencias")
  {
    return 28;
  }
  if (motivo1des === "Faltan datos en la dirección")
  {
    return 29;
  }
  if (motivo1des === "No hay acceso a la zona")
  {
    return 30;
  }
  if (motivo1des === "No lo conocen")
  {
    return 31;
  }
  if (motivo1des === "No visitado")
  {
    return 32;
  }
  if (motivo1des === "Se mudó")
  {
    return 33;
  }
  if (motivo1des === "Se negó a recibir")
  {
    return 34;
  }
}

