import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { User } from 'src/app/_models/user';
import { OrdenTransporteService } from 'src/app/_services/Seguimiento/ordentransporte.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { DespachosATiempo } from 'src/app/_models/Seguimiento/ordentransporte';

@Component({
  selector: 'app-tiempoentrega',
  templateUrl: './tiempoentrega.component.html',
  styleUrls: ['./tiempoentrega.component.scss']
})
export class TiempoentregaComponent implements OnInit {

  data: any;
  user: User ;
  clientes: SelectItem[] = [];
  model: any = [];
  ubigeo: SelectItem[] = [];
  dateInicio: Date = new Date(Date.now()) ;
  dateFin: Date = new Date(Date.now()) ;
  es: any;
  despachos : DespachosATiempo[];
  loading: any;
  constructor(private ordenTransporteService: OrdenTransporteService) {
    


   }

  ngOnInit() {


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

    this.ordenTransporteService.getClientes('').subscribe(resp => {
      this.clientes.push({ value: '0',  label : 'TODOS LOS CLIENTES'});
      resp.forEach(element => {
          this.clientes.push({ value: element.idcliente ,  label : element.razonsocial});
        });
 
        this.model.idcliente = '0';
        this.model.atiempo = 0;
        this.model.notiempo = 0 ;

         this.ordenTransporteService.GetDespachosATiempo(this.model.idcliente, this.dateInicio.toLocaleDateString(), this.dateFin.toLocaleDateString()).subscribe( resp => {
          
         
          

          resp.forEach(item =>  {
            if(item.atiempo > 0) { 
              this.model.atiempo = this.model.atiempo + 1 ;
            }
            else {
              this.model.notiempo =  this.model.notiempo + 1;
            }
          });
          


          let total =  this.model.atiempo  +   this.model.notiempo;
       
          let porcentajeatiempo =  (this.model.atiempo  * 100) / total;
          let porcentajenotiempo =  (this.model.notiempo  * 100) / total;
    
          this.data = {
            labels: ['A Tiempo ' + porcentajeatiempo.toFixed(2) + '%'
                  ,'Fuera de Tiempo ' + porcentajenotiempo.toFixed(2) + '%'],
               
            datasets: [
                {
                    data: [ porcentajeatiempo.toFixed(2), porcentajenotiempo.toFixed(2)],
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
      });

    }
    buscar() {
      this.loading = true;
      this.ordenTransporteService.GetDespachosATiempo(
        this.model.idcliente, this.dateInicio.toLocaleDateString(), this.dateFin.toLocaleDateString()).subscribe( resp => {

          this.despachos = resp;
          this.model.atiempo = 0;
          this.model.notiempo = 0;
          this.model.total = resp.length;
          
          this.loading = false;

        resp.forEach(item =>  {
          if(item.atiempo > 0) { 
            this.model.atiempo = this.model.atiempo + 1 ;
          }
          else {
            this.model.notiempo =  this.model.notiempo + 1;
          }
        });
        


        let total =  resp.length;
     
        let porcentajeatiempo =  (this.model.atiempo  * 100) / total;
        let porcentajenotiempo =  (this.model.notiempo  * 100) / total;
  
        this.data = {
          labels: ['A Tiempo ' + porcentajeatiempo.toFixed(2) + '%'
          ,'Fuera de Tiempo ' + porcentajenotiempo.toFixed(2) + '%'],
             
          datasets: [
              {
                  data: [ porcentajeatiempo.toFixed(2), porcentajenotiempo.toFixed(2)],
                  backgroundColor: [
                    "#008f39",
                    "#f71600"
                   
                ],
                hoverBackgroundColor: [
                    "#008f39",
                    "#f71600"
                  
                    
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
