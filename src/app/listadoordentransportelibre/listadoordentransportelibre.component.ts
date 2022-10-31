import { Component, OnInit } from '@angular/core';


import { User } from 'src/app/_models/user';

import { FileModal2Component } from './modalfiles2';
import { GuiasModal2Component } from './modalguias2';

import { Router } from '@angular/router';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { SelectItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/_common/datepicker.extend';
import { OrdenTransporte } from 'src/app/_models/Seguimiento/ordentransporte';
import { OrdenTransporteService } from 'src/app/_services/Seguimiento/ordentransporte.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-listadoordentransportelibre',
  templateUrl: './listadoordentransportelibre.component.html',
  styleUrls: ['./listadoordentransportelibre.component.css'],
  providers: [ DialogService,
    {
        provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
    ]
})
export class ListadoordentransportelibreComponent implements OnInit {

  clientes: SelectItem[] = [];
  ubigeo: SelectItem[] = [];
  estados: SelectItem[] = [];

  ordenes: OrdenTransporte  = {} ;

  model: any = {};
  ProveedorLoaded = false;
  UbigeoLoaded = false;
  cols: any[];
  es: any;
  frozenCols: any[];
  user: User ;
  loading: any;
  dateInicio: Date = new Date(Date.now()) ;
  dateFin: Date = new Date(Date.now()) ;

  constructor(private ordenTransporteService: OrdenTransporteService,
              public dialogService: DialogService ,
              public router: Router,
              public alertify: ToastrService) { }

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
      {header: 'ACC', field: 'numcp'  ,  width: '120px' },
         {header: 'OT', field: 'numcp'  ,  width: '120px' },
        {header: 'F. REGISTRO', field: 'fecharegistro_string' , width: '120px'  },
        {header: 'RAZÓN SOCIAL', field: 'razonsocial' , width: '260px' },
        {header: 'DOC REF', field: 'docgeneral' , width: '120px'  },
        {header: 'TIP TRANS', field: 'fecha_carga' , width: '120px'  },
        {header: 'ESTADO', field: 'estado'  , width: '140px'   },
        {header: 'ESTADO MERCADERIA' , field: 'estadomercaderia_entrega'  , width: '140px'   },
        {header: 'F. RECOJO', field: 'fecharecojo' , width: '140px'  },
        {header: 'F. DESPACHO', field: 'fechadespacho' , width: '140px'  },
        {header: 'F. ENTREGA', field: 'fechaentrega' , width: '140px'  },
        {header: 'DESTINO', field: 'destino'  ,  width: '180px'  },
        {header: 'REMITENTE', field: 'remitente'  ,  width: '180px'  },
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

  }
  verarchivos(id) {
      const ref = this.dialogService.open(FileModal2Component, {
        header: 'Descargar File',
        width: '50%',
        data : {id }
    });
  }

  verguias(id) {
    const ref = this.dialogService.open(GuiasModal2Component, {
      header: 'Guias',
      width: '50%',
      data : {id }
  });
  }

  cerrar() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);
  }

  buscar() {
    this.loading = true;
    if (this.model.guiarecojo === undefined) {
      this.model.guiarecojo = '';
    }
    if (this.model.numcp === undefined) {
      this.model.numcp = '';
    }





    if (this.model.guiarecojo === ''  && this.model.numcp === '') {
      this.model.guiarecojo = '';
      this.model.numcp = '';
      this.loading = false;
      this.alertify.warning('Debe ingresar al menos un parámetro de búsqueda.');
      return;

    }


    if (this.model.guiarecojo.length > 0) {
        if (this.model.guiarecojo.length < 4) {
          this.loading = false;
          this.alertify.warning('Debe ingresar como mínimo 4 caracteres.');
          return;
            }
        }

    if (this.model.numcp.length > 0) {
    if (this.model.numcp.length <  4) {
      this.loading = false;
      this.alertify.warning('Debe ingresar como mínimo 4 caracteres.');
      return;
     }
   }





    this.ordenTransporteService.GetAllOrderOtros(this.model).subscribe(list => {
        this.loading = false;
        if (list === null) {
              this.ordenes = {};
        } else {
          this.ordenes =  list;
        }

      });
  }

//  exportExcel() {
//     import('xlsx').then(xlsx => {
//         const worksheet = xlsx.utils.json_to_sheet( this.ordenes );
//         const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
//         const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
//         this.saveAsExcelFile(excelBuffer, 'ListaOT');
//     });
// }
// saveAsExcelFile(buffer: any, fileName: string): void {
//   import('file-saver').then(FileSaver => {
//       const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
//       const EXCEL_EXTENSION = '.xlsx';
//       const data: Blob = new Blob([buffer], {
//           type: EXCEL_TYPE
//       });
//       FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
//   });
// }
}
