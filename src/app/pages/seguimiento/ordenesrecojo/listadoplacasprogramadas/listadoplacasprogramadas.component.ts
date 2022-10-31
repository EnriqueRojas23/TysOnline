import { Component, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { Router } from '@angular/router';
import { SelectItem, MenuItem, ConfirmationService, MessageService } from 'primeng/api';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { OverlayPanel } from 'primeng/overlaypanel';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/_common/datepicker.extend';
import { GuiaRemisionBlanco } from 'src/app/_models/Seguimiento/guiaremisionblanco';
import { OrdenTransporte } from 'src/app/_models/Seguimiento/ordentransporte';
import { User } from 'src/app/_models/user';
import { OrdenTransporteService } from 'src/app/_services/Seguimiento/ordentransporte.service';
import { AsignarEstibaComponent } from './modal.asignarestiba';

@Component({
  selector: 'app-listadoplacasprogramadas',
  templateUrl: './listadoplacasprogramadas.component.html',
  styleUrls: ['./listadoplacasprogramadas.component.scss'],
  styles: [`
  :host ::ng-deep .ui-splitbutton {
      margin-right: .25em;
  }
`],
providers: [ConfirmationService, MessageService, DialogService,
{
    provide: DateAdapter, useClass: AppDateAdapter
},
{
    provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
}
]
})
export class ListadoplacasprogramadasComponent implements OnInit {


  clientes: SelectItem[] = [];
  ubigeo: SelectItem[] = [];
  estados: SelectItem[] = [];

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
  items: MenuItem[];

  selected: GuiaRemisionBlanco;

  constructor(private ordenTransporteService: OrdenTransporteService,
              public dialogService: DialogService,
              private router: Router,
              private confirmationService: ConfirmationService,
              public messageService: MessageService
              ) { }

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('user'));


    this.model.idusuario = this.user.usr_int_id;
    this.dateInicio.setDate((new Date()).getDate() - 30);
    this.dateFin.setDate((new Date()).getDate() );
    this.model.numcp = '';
    this.model.docreferencia = '';
    this.model.grr = '';



    this.cols =
    [
        {header: 'ACC', field: 'numcp'  ,  width: '30px' },
        {header: 'HR', field: 'numhojaruta' , width: '60px'  },
        {header: 'PLACA', field: 'fecharegistro' , width: '60px'  },
        {header: 'CHOFER', field: 'razonsocial'  ,  width: '180px'  },
        {header: 'PROVEEDOR', field: 'fechahoracita' , width: '180px'  },
        // {header: 'CLIENTE', field: 'cliente' , width: '180px'  },
        // {header: 'FECHA CITA', field: 'fechahoracita' , width: '120px'  },
        // {header: 'ESTADO' , field: 'responsable'  , width: '120px'   },
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
  exportExcel() {

  }
  ver(id) {

    this.router.navigate(['/seguimiento/programacionplaca', id]);

  }
  asignar (id) {
    this.ref = this.dialogService.open(AsignarEstibaComponent, {
      header: 'Asignar Estiba',
      width: '40%',
      contentStyle: {'max-height': '400px', overflow: 'auto'},
      baseZIndex: 10000
  });

    this.ref.onClose.subscribe((product: any) => {
      if (product === undefined) { return; }
      else{
        console.log(product);



        this.messageService.add({severity: 'info', summary: 'Vehículo seleccionado', detail: product.placa});
      }
  });

  }

  verguias(id) {
    this.router.navigate(['/seguimiento/verorden', id]);
  }

  save(info: string) {
    let resumen = '';
    this.router.navigate(['/seguimiento/asignarequipotransporte', resumen]);
  }

  eliminar(id) {

    this.confirmationService.confirm({
      message: '¿Esta seguro que desea elminar esta OR?',
      accept: () => {
        this.loading = true;
        this.model.responsablecomercialid = this.user.usr_int_id;
        this.model.idordentrabajo = id;
        this.ordenTransporteService.eliminar(this.model).subscribe(resp => {


          this.loading = false;
          this.router.navigate(['/seguimiento/ordenrecojo']);
        });
      }
  });

  }

  buscar() {
      this.model.fec_ini = this.dateInicio;
      this.model.fec_fin = this.dateFin;
      this.loading = true;
      this.ordenTransporteService.GetAllPlacasProgramadas(this.model).subscribe(list => {
        this.loading = false;
        this.ordenes =  list;
        console.log(this.ordenes);

      });
  }

  asignarguiasblanco(){
    this.router.navigate(['/seguimiento/asignarguias', this.selected.idmanifiesto, this.selected.idvehiculo]);
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

    if(image) {
       reader.readAsDataURL(image);
    }
 }


}
