import { Component, Input, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SelectItem, MessageService, ConfirmationService } from 'primeng/api';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/_common/datepicker.extend';
import { OrdenTransporte } from 'src/app/_models/Seguimiento/ordentransporte';
import { User } from 'src/app/_models/user';
import { OrdenTransporteService } from 'src/app/_services/Seguimiento/ordentransporte.service';
import { PrecintosModalComponent } from '../modalprecintos';
import { DesasignarModalComponent } from '../modaldesasignar';


@Component({
  selector: 'app-manifiesto',
  templateUrl: './manifiesto.component.html',
  styleUrls: ['./manifiesto.component.scss'],
  providers: [ConfirmationService, MessageService, DialogService,
    {
        provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
    ]
})
export class ManifiestoComponent implements OnInit {

  @Input() titulo: string;
  @Input() descripcion: string;

  clientes: SelectItem[] = [];
  destinatarios: SelectItem[] = [];
  ubigeo: SelectItem[] = [];
  estados: SelectItem[] = [];
  tipotransporte: SelectItem[] = [];

  ordenes: OrdenTransporte[] = [];
  ordenes2: OrdenTransporte[] = [];
  estado: any;


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
        {header: 'N° OT', field: 'numcp'  ,  width: '105px' },
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





  buscar() {


      this.model.fec_ini = this.dateInicio;
      this.model.fec_fin = this.dateFin;
      this.loading = true;

      this.model.numhojaruta =  this.titulo ;

      if(this.model.iddestinatario == undefined) {
        this.model.iddestinatario = '';
      }

      this.ordenTransporteService.getAllPreManifiestos(this.model).subscribe(list =>  {

          let count = 1;
          this.loading = false;
          this.ordenes =  list;
          this.ordenes2 = list;

          this.estado = list[0].estado;

          this.ordenes2.forEach(list => {
            list.idorden = count ++;
          });
      });



  }

  guardar() {
    let numhojaruta = this.titulo;
    this.model.numhojaruta = numhojaruta;

    let idcarga = this.ordenes[0].idcarga;
    this.model.idcarga = idcarga;

    this.confirmationService.confirm({
      message: '¿Esta seguro que desea generar la orden de carga?',
      accept: () => {
        this.loading = true;

        console.log(this.model, 'guardar');


          this.ordenTransporteService.confirmarDespacho2(this.model, this.ordenes2).subscribe(list => {


          var url = "http://104.36.166.65/webreports/carga.aspx?idcarga=" + String(idcarga);
          window.open(url);


          // var url = "http://104.36.166.65/webreports/guiatransportista.aspx?idcarga=" + String(idcarga);
          // window.open(url);



          this.buscar();

        });
      }
    });


  }
  asignarPrecinto() {

    let hojaruta = this.model.numhojaruta;
    this.ref = this.dialogService.open(PrecintosModalComponent, {
      data : { hojaruta },
      header: 'Asignar Precintos',
      width: '50%',
      contentStyle: {'max-height': '500px', overflow: 'auto'},
      baseZIndex: 10000
   });


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

        });

        // var url = "http://104.36.166.65/webreports/manifiesto.aspx?idmanifiesto=" + String(val);
        // window.open(url);

        // var url = "http://104.36.166.65/webreports/hojaruta.aspx?iddespacho=" + String(jsonres.iddespacho);
        // window.open(url);



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
  onRowReorder() {
   let count = 1;

    this.ordenes2.forEach(list => {
      list.idorden = count ++;
    });

  }



}




