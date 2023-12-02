import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { SelectItem, ConfirmationService, MessageService } from 'primeng/api';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { OverlayPanel } from 'primeng/overlaypanel';
import { OrdenTransporte } from 'src/app/_models/Seguimiento/ordentransporte';
import { User } from 'src/app/_models/user';
import { OrdenTransporteService } from 'src/app/_services/Seguimiento/ordentransporte.service';
import { FileModalComponent } from 'src/app/pages/seguimiento/ordentransporte/listadoordentransporte/modalfiles';
import { GuiasModalComponent } from 'src/app/pages/seguimiento/ordentransporte/listadoordentransporte/modalguias';

@Component({
  selector: 'app-operaciondetalle',
  templateUrl: './operaciondetalle.component.html',
  styleUrls: ['./operaciondetalle.component.scss']
})
export class OperaciondetalleComponent implements OnInit {

  @Input() titulo: string;
  @Input() descripcion: string;

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
              private datePipe :DatePipe,
              private confirmationService: ConfirmationService,
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
        {header: 'N° OT', field: 'idordentrabajo'  ,  width: '105px' },
        {header: 'PROVINCIA', field: 'docgeneral' , width: '90px'  },
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

      this.model.idcarga =  this.titulo ;

      if(this.model.iddestinatario == undefined) {
        this.model.iddestinatario = '';
      }

      this.ordenTransporteService.getAllOperacionesDetalles(this.model).subscribe(list =>  {

          let count = 1;
          this.loading = false;
          this.ordenes =  list;
          this.ordenes2 = list;

          console.log(list);

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
  guardar() {
    let idcarga = this.titulo;
    this.model.idcarga = idcarga

    this.confirmationService.confirm({
      message: '¿Esta seguro que desea generar la orden de carga?',
      accept: () => {
        this.loading = true;


        // this.ordenTransporteService.confirmarDespacho2(this.model).subscribe(list => {


        //   var url = "http://104.36.166.65/webreports/carga.aspx?idcarga=" + String(idcarga);
        //   window.open(url);


        //   var url = "http://104.36.166.65/webreports/guiatransportista.aspx?idcarga=" + String(idcarga);
        //   window.open(url);



        //   this.buscar();

        // });
      }
    });


  }
  onRowReorder() {
   let count = 1;

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

