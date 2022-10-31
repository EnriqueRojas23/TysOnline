import { Component, OnInit } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { Router } from '@angular/router';
import { DateAdapter } from 'angular-calendar';
import * as moment from 'moment';
import { SelectItem, MessageService, ConfirmationService } from 'primeng/api';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { OverlayPanel } from 'primeng/overlaypanel';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/_common/datepicker.extend';
import { OrdenTransporte } from 'src/app/_models/Seguimiento/ordentransporte';
import { User } from 'src/app/_models/user';
import { OrdenTransporteService } from 'src/app/_services/Seguimiento/ordentransporte.service';
import { FileModalComponent } from '../listadoordentransporte/modalfiles';
import { GuiasModalComponent } from '../listadoordentransporte/modalguias';

@Component({
  selector: 'app-listadoordentransportecliente',
  templateUrl: './listadoordentransportecliente.component.html',
  styleUrls: ['./listadoordentransportecliente.component.scss'],
  providers: [ConfirmationService, MessageService, DialogService,
    {
        provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
    ]
})
export class ListadoordentransporteclienteComponent implements OnInit {
  clientes: SelectItem[] = [];
  destinatarios: SelectItem[] = [];
  ubigeo: SelectItem[] = [];
  estados: SelectItem[] = [];
  tipotransporte: SelectItem[] = [];

  ordenes: OrdenTransporte[] = [];
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

  constructor(private ordenTransporteService: OrdenTransporteService,
              public dialogService: DialogService,
              private router: Router,
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



    this.cols =
    [
         {header: 'OT', field: 'numcp'  ,  width: '105px' },
         {header: 'ACC', field: 'numcp'  ,  width: '105px' },
        {header: 'REFERENCIA', field: 'docgeneral' , width: '90px'  },
        {header: 'TIPO TRANS', field: 'fecha_carga' , width: '90px'  },
        {header: 'ESTADO', field: 'estado'  , width: '90px'   },
        {header: 'TIPO ENTREGA' , field: 'tipoentrega'  , width: '160px'   },
        {header: 'F. RECOJO', field: 'fecharecojo' , width: '120px'  },
        {header: 'PUNTO RECOJO' , field: 'puntopartida'  , width: '220px'   },
        {header: 'F. DESPACHO', field: 'fechadespacho' , width: '120px'  },
        {header: 'F. ENTREGA', field: 'fechaentrega' , width: '120px'  },
        {header: 'PERSONA ENTREGA', field: 'destino'  ,  width: '150px'  },
        {header: 'DESTINO', field: 'destino'  ,  width: '90px'  },
        {header: 'DESTINATARIO', field: 'destinatario' , width: '180px'  },



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

    this.ordenTransporteService.getClientes(this.user.idclientes).subscribe(resp => {

        this.clientes.push({ value: 0,  label : 'TODOS LOS CLIENTES'});

        resp.forEach(element => {
            this.clientes.push({ value: element.idcliente ,  label : element.razonsocial});
          });

        this.ProveedorLoaded = true;
        this.model.idcliente = 0;

      });

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

    const ref = this.dialogService.open(FileModalComponent, {
      header: 'Visor Fotos',
      width: '30%',
      data : {id }
  });
  }
  verdetalles(id) {
     this.router.navigate(['/seguimiento/verorden', id]);
  }
  verguias(id) {
    this.ref = this.dialogService.open(GuiasModalComponent, {
      data : {id },
      header: 'Guias',
      width: '50%',
      contentStyle: {'max-height': '500px', overflow: 'auto'},
      baseZIndex: 10000
  });
  }

  buscar() {
      this.model.fec_ini = this.dateInicio;
      this.model.fec_fin = this.dateFin;
      this.loading = true;

      if(this.model.iddestinatario == undefined) {
        this.model.iddestinatario = '';


      }
      this.model.idproveedor = '';


      this.ordenTransporteService.getAllOrderTransport(this.model).subscribe(list => {
        this.loading = false;
        this.ordenes =  list;

      });
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


    }, false);

    if (image) {
       reader.readAsDataURL(image);
    }
 }


}
