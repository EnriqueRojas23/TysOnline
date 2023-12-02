import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';
import { User } from 'src/app/_models/user';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/_common/datepicker.extend';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { ConfirmationService, MenuItem, MessageService, SelectItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { OrdenTransporte } from 'src/app/_models/Seguimiento/ordentransporte';
import { Router } from '@angular/router';
import { OverlayPanel } from 'primeng/overlaypanel';
import { FileModalComponent } from '../../ordentransporte/listadoordentransporte/modalfiles';
import { OrdenTransporteService } from 'src/app/_services/Seguimiento/ordentransporte.service';
import { AsignarEstibaComponent } from '../listadoplacasprogramadas/modal.asignarestiba';
import { VerAsignacionComponent } from '../listadoplacasprogramadas/modal.verasignacion';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-listadoordenesrecojo',
  templateUrl: './listadoordenesrecojo.component.html',
  styleUrls: ['./listadoordenesrecojo.component.scss'],
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
export class ListadoordenesrecojoComponent implements OnInit {

  clientes: SelectItem[] = [];
  ubigeo: SelectItem[] = [];
  estados: SelectItem[] = [];

  ordenes: OrdenTransporte[] = [];
  selected: OrdenTransporte[];
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


  constructor(private ordenTransporteService: OrdenTransporteService,
              public dialogService: DialogService,
              private router: Router,
              private toastr: ToastrService,
              private confirmationService: ConfirmationService,
              public messageService: MessageService
              ) { }

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('user'));

        this.items = [
          {label: 'Update', icon: 'pi pi-refresh', command: () => {
            // this.update();
          }},
          {label: 'Delete', icon: 'pi pi-times', command: () => {
              // this.delete();
          }},
          {label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io'},
          {separator: true},
          {label: 'Setup', icon: 'pi pi-cog', routerLink: ['/setup']}
      ];

    this.model.idusuario = this.user.usr_int_id;
    this.dateInicio.setDate((new Date()).getDate() - 7);
    this.dateFin.setDate((new Date()).getDate() );
    this.model.numcp = '';
    this.model.docreferencia = '';
    this.model.grr = '';



    this.cols =
    [
        {header: 'ACC', field: 'numcp'  ,  width: '150px' },
        {header: 'OR', field: 'numcp'  ,  width: '80px' },
        {header: 'F. REGISTRO', field: 'fecharegistro' , width: '120px'  },
        {header: 'RESPONSABLE' , field: 'responsable'  , width: '120px'   },
        {header: 'CLIENTE', field: 'razonsocial'  ,  width: '180px'  },
        {header: 'F. CITA', field: 'fechahoracita' , width: '120px'  },
        {header: 'ESTADO', field: 'estado'  , width: '90px'   },
        {header: 'CONTACTO', field: 'personarecojo' , width: '120px'  },
        {header: 'T. UNIDAD', field: 'tipounidad'  ,  width: '80px'  },
        {header: 'PT. RECOJO', field: 'personarecojo' , width: '220px'  },
        {header: 'CE. ACOPIO', field: 'centroacopio' , width: '120px'  },
        {header: 'CANT', field: 'cantidad'  ,  width: '80px'  },
        {header: 'PESO', field: 'peso'  ,  width: '80px'  },
        {header: 'VOL', field: 'pesovol'  ,  width: '80px'  },
        {header: 'OBSERVACIÓN', field: 'observacion'  ,  width: '580px'  },
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
    this.estados.push({ value: 26,  label : 'Registrado'});
    this.estados.push({ value: 27,  label : 'Programado'});
    this.estados.push({ value: 28,  label : 'Liquidado'});

    this.model.idestado = 0;



  }
 exportExcel() {
    import('xlsx').then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet( this.ordenes );
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, 'ListaOT');
    });
}
saveAsExcelFile(buffer: any, fileName: string): void {
  import('file-saver').then(FileSaver => {
      const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
          type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  });
}
  editar(id) {
    this.router.navigate(['/seguimiento/editarordenrecojo', id]);
  }

  verguias(id) {
    this.router.navigate(['/seguimiento/verorden', id]);
  }

  save(info: string) {
    let resumen = '';
    this.selected.forEach(res => {
      resumen = resumen + ',' + res.idordentrabajo.toString();
     });
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
          //this.messageService.add({severity: 'info', summary: 'Orden Recojo', detail: 'Se ha eliminado con éxito.'});
          this.toastr.show('Se ha eliminado con éxito.' );
          this.buscar();
          this.loading = false;
         // this.router.navigate(['/seguimiento/ordenrecojo']);
        });
      }
  });

  }

  buscar() {
      this.model.fec_ini = this.dateInicio;
      this.model.fec_fin = this.dateFin;
      this.loading = true;
      this.ordenTransporteService.getAllOrderRecojo(this.model).subscribe(list => {
        console.log(list);
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
 ver(id) {
  this.ref = this.dialogService.open(VerAsignacionComponent, {
    header: 'Ver detalle de asignación',
    width: '40%',
    contentStyle: {'max-height': '400px', overflow: 'auto'},
    baseZIndex: 10000,
    data : {id }
});

  this.ref.onClose.subscribe((product: any) => {
    if (product === undefined) { return; }
    else{

      this.messageService.add({severity: 'info', summary: 'Vehículo seleccionado', detail: product.placa});
    }
});

 }
 asignar (id) {
  this.ref = this.dialogService.open(AsignarEstibaComponent, {
    header: 'Asignar Estiba',
    width: '40%',
    contentStyle: {'max-height': '400px', overflow: 'auto'},
    baseZIndex: 10000,
    data : {id }
});

  this.ref.onClose.subscribe((product: any) => {
    if (product === undefined) { return; }
    else{
      this.messageService.add({severity: 'info', summary: 'Vehículo seleccionado', detail: product.placa});
    }
});

}


}
