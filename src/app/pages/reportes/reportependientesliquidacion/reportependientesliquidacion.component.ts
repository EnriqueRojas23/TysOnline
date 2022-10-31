import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { DespachosATiempo, ManifiestosPendientes } from 'src/app/_models/Seguimiento/ordentransporte';
import { User } from 'src/app/_models/user';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { OrdenTransporteService } from 'src/app/_services/Seguimiento/ordentransporte.service';

@Component({
  selector: 'app-reportependientesliquidacion',
  templateUrl: './reportependientesliquidacion.component.html',
  styleUrls: ['./reportependientesliquidacion.component.scss']
})
export class ReportependientesliquidacionComponent implements OnInit {

  data: any;
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
  
  loading: any;
  constructor(private ordenTransporteService: OrdenTransporteService,
    private generalService: GeneralService) {
    


   }

  ngOnInit() {
    this.estados.push( { label : "Pendiente" , value : 16 } );
    this.estados.push( { label : "Liquidado" , value : 18 } );


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


        this.model.idcliente = '0';
        this.model.atiempo = 0;
        this.model.notiempo = 0 ;

         this.ordenTransporteService.GetReportePendientes(this.model.idestado
          , this.dateInicio.toLocaleDateString()
          , this.dateFin.toLocaleDateString()
            ).subscribe( resp => {


              this.despachos = resp;

              this.model.liquidados= 0;
              this.model.pendientes = 0;
               this.model.total = resp.length;
               
               resp.forEach(x=> {
                 if(x.estado === "Completado")
                  this.model.liquidados = this.model.liquidados  + 1;
               })

               resp.forEach(x=> {
                if(x.estado === "Creado")
                 this.model.pendientes = this.model.pendientes  + 1;
              })
              
         
          



          let total =   this.model.total ;       
          let liquidados =  (this.model.liquidados  * 100) / total;
          let pendientes =  (this.model.pendientes  * 100) / total;          
          
    
          this.data = {
            labels: ['Liquidados ' + liquidados.toFixed(2) + '%'
                  ,'Pendientes ' + pendientes.toFixed(2) + '%'],
               
            datasets: [
                {
                    data: [ liquidados.toFixed(2), pendientes.toFixed(2)],
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB"
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB"
                        
                    ]
                }]    
            };

         })


    }
    cargarProvinciasDestino(item) {
      this.listaProvincia = [];
    
      this.generalService.GetAllProvincias(item.value).subscribe(resp => {
        resp.forEach(item => {
        this.listaProvincia.push ({ label: item.provincia , value : item.idprovincia});
      });
    });
    }
    buscar() {
      this.loading = true;
      this.ordenTransporteService.GetReportePendientes(
        this.model.idestado, this.dateInicio.toLocaleDateString(), this.dateFin.toLocaleDateString()
          ).subscribe( resp => {

          this.despachos = resp;
          this.loading = false;
       
              this.despachos = resp;
              
              this.model.liquidados= 0;
              this.model.pendientes = 0;
               this.model.total = resp.length;
               
               resp.forEach(x=> {
                 if(x.estado === "Completado")
                  this.model.liquidados = this.model.liquidados  + 1;
               })

               resp.forEach(x=> {
                if(x.estado === "Creado")
                 this.model.pendientes = this.model.pendientes  + 1;
              })
              
         

    
        


     
              let total =   this.model.total ;       
              let liquidados =  (this.model.liquidados  * 100) / total;
              let pendientes =  (this.model.pendientes  * 100) / total;        


        this.data =   {
            labels: ['Liquidados ' + liquidados.toFixed(2) + '%'
                  ,'Pendientes ' + pendientes.toFixed(2) + '%'],
               
            datasets: [
                {
                    data: [ liquidados.toFixed(2), pendientes.toFixed(2)],
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB"
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB"
                        
                    ]
                }]    
            };

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
