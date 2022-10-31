import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { ManifiestosPendientes } from 'src/app/_models/Seguimiento/ordentransporte';
import { User } from 'src/app/_models/user';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { OrdenTransporteService } from 'src/app/_services/Seguimiento/ordentransporte.service';

@Component({
  selector: 'app-reportependientesingresos',
  templateUrl: './reportependientesingresos.component.html',
  styleUrls: ['./reportependientesingresos.component.scss']
})
export class ReportependientesingresosComponent implements OnInit {

  
  user: User ;
  estados: SelectItem[] = [];
  model: any = [];
  ubigeo: SelectItem[] = [];
  dateInicio: Date = new Date(Date.now()) ;
  dateFin: Date = new Date(Date.now()) ;
  es: any;
  despachos : ManifiestosPendientes[];
  listaDepartamento: SelectItem[] = [];
  listaProvincia: SelectItem[] = [];  
  cols: any[];
  
  loading: any;
  constructor(private ordenTransporteService: OrdenTransporteService,
    private generalService: GeneralService) {
    


   }

  ngOnInit() {
    this.estados.push( { label : "Pendiente" , value : 16 } );
    this.estados.push( { label : "Liquidado" , value : 18 } );

    this.cols =
    [
        {header: 'OT', field: 'numcp'  ,  width: '150px' },
        {header: 'CORRELATIVO', field: 'correlativo' , width: '120px'  },
        {header: 'ALMACENADO' , field: 'almacenado'  , width: '120px'   },
        {header: 'DESPACHADO', field: 'despachado'  ,  width: '80px'  },
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

    this.user = JSON.parse(localStorage.getItem('user'));
 

         this.ordenTransporteService.GetReportePendientesIngresos('').subscribe( resp => {
              this.despachos = resp;
         });

    }

    buscar() {
      this.loading = true;
      this.ordenTransporteService.GetReportePendientesIngresos(this.model.numcp).subscribe( resp => {
          this.despachos = resp;
          this.loading = false;
      });
    }

    exportExcel() {
          import('xlsx').then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet( this.despachos );
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            this.saveAsExcelFile(excelBuffer, 'ListaOT_');
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
}
