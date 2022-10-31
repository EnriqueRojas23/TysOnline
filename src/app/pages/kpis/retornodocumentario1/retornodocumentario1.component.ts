import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { DespachosATiempo, RetornoDocumetario } from 'src/app/_models/Seguimiento/ordentransporte';
import { User } from 'src/app/_models/user';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { OrdenTransporteService } from 'src/app/_services/Seguimiento/ordentransporte.service';

@Component({
  selector: 'app-retornodocumentario1',
  templateUrl: './retornodocumentario1.component.html',
  styleUrls: ['./retornodocumentario1.component.scss']
})
export class Retornodocumentario1Component implements OnInit {

  data: any;
  user: User ;
  clientes: SelectItem[] = [];
  model: any = [];
  ubigeo: SelectItem[] = [];
  dateInicio: Date = new Date(Date.now()) ;
  dateFin: Date = new Date(Date.now()) ;
  es: any;
  despachos : DespachosATiempo[];
  listaDepartamento: SelectItem[] = [];
  listaProvincia: SelectItem[] = [];

  loading: any;
  constructor(private ordenTransporteService: OrdenTransporteService,
    private generalService: GeneralService) {



   }

  ngOnInit() {

    this.generalService.GetAllDepartamentos().subscribe(resp => {
      resp.forEach(item => {
      this.listaDepartamento.push ({ label: item.departamento , value : item.iddepartamento});
    });
  });


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

         this.ordenTransporteService.GetDespachosConciliacion(this.model.idcliente
          , this.dateInicio.toLocaleDateString()
          , this.dateFin.toLocaleDateString()
          , this.model.iddepartamento, this.model.idprovincia ).subscribe( resp => {




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

         });

























      });

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
      this.ordenTransporteService.GetDespachosConciliacion(
        this.model.idcliente, this.dateInicio.toLocaleDateString(), this.dateFin.toLocaleDateString(),  this.model.iddepartamento, this.model.idprovincia).subscribe( resp => {

          this.despachos = resp;

          console.log(this.despachos);
          this.model.coinciden = 0;
          this.model.nocoinciden = 0;
          this.model.pendientes = 0;
          this.model.total = resp.length;

          this.loading = false;

        resp.forEach(item =>  {
          if(item.atiempo === 1) {
            this.model.coinciden = this.model.coinciden + 1 ;
          }
          else if (item.atiempo === 0) {
            this.model.nocoinciden =  this.model.nocoinciden + 1;
          }
          else {
            this.model.pendientes =  this.model.pendientes + 1;
          }
        });



        let total =  resp.length;

        let porcentajeatiempo =  (this.model.coinciden  * 100) / total;
        let porcentajenotiempo =  (this.model.nocoinciden  * 100) / total;
        let porcentajependientes =  (this.model.pendientes  * 100) / total;

        this.data = {
          labels: ['A tiempo ' + porcentajeatiempo.toFixed(2) + '%'
          ,'Fuera de tiempo ' + porcentajenotiempo.toFixed(2) + '%'
          ,'Pendientes ' + porcentajependientes.toFixed(2) + '%'],

          datasets: [
              {
                  data: [ porcentajeatiempo.toFixed(2), porcentajenotiempo.toFixed(2) ,porcentajependientes.toFixed(2)],
                  backgroundColor: [
                    "#008f39",
                    "#f71600",
                    "#f54600"
                ],
                hoverBackgroundColor: [
                    "#008f39",
                    "#f71600",
                    "#f54600"


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
