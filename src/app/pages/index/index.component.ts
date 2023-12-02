import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { DespachosATiempo } from 'src/app/_models/Seguimiento/ordentransporte';
import { User } from 'src/app/_models/user';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { OrdenTransporteService } from 'src/app/_services/Seguimiento/ordentransporte.service';

declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  data: any;
  data2: any;
  data3: any;
  user: User ;
  clientes: SelectItem[] = [];
  model: any = [];
  ubigeo: SelectItem[] = [];
  dateInicio: Date = new Date(Date.now()) ;
  dateFin: Date = new Date(Date.now()) ;
  es: any;


  despachos : DespachosATiempo[];
  retorno : DespachosATiempo[];
  entrega : DespachosATiempo[];

  listaDepartamento: SelectItem[] = [];
  listaProvincia: SelectItem[] = [];

  loading: any;
  constructor(private generalService: GeneralService
    ,private ordenTransporteService: OrdenTransporteService) { }

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('user'));

    this.model.idusuario = this.user.usr_int_id;

    this.generalService.GetAllDepartamentos().subscribe(resp => {
      this.listaDepartamento.push({ value: '0',  label : 'TODOS LOS DEPARTAMENTOS'});
      resp.forEach(item => {
      this.listaDepartamento.push ({ label: item.departamento , value : item.iddepartamento});
    });
  });




    this.user = JSON.parse(localStorage.getItem('user'));

    this.ordenTransporteService.getClientes(this.user.idclientes).subscribe(resp => {
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

            this.retorno = resp;

            this.model.anioactual = 2022;

            this.retorno.forEach( x=> {

              if(x.rango === 'hasta7')
                this.model.hasta7 = x.ots;
              if(x.rango === 'hasta50')
                this.model.hasta50 = x.ots;
              if(x.rango === 'hasta100')
                this.model.hasta100 = x.ots;
                if(x.rango === 'masde100')
                this.model.masde100 = x.ots;
                if(x.rango === 'conciliados')
                this.model.atiempo = x.ots;

            });





          this.model.notiempo = this.model.hasta7 +  this.model.hasta50 + this.model.hasta100 + this.model.masde100;


          let total =  this.model.atiempo  +   this.model.notiempo;

          let porcentajeatiempo =  (this.model.atiempo  * 100) / total;
          let porcentajenotiempo =  (this.model.notiempo  * 100) / total;

          this.data = {
            labels: [' Retornados ' + porcentajeatiempo.toFixed(2) + '%'
                  ,'Pendientes de Retorno ' + porcentajenotiempo.toFixed(2) + '%'],

            datasets: [
                {
                    data: [ porcentajeatiempo.toFixed(2), porcentajenotiempo.toFixed(2)],
                    backgroundColor: [
                      "#006400",
                      "#ff0000"
                    ],
                    hoverBackgroundColor: [
                      "#006400",
                      "#ff0000"

                    ]
                }]
            };

         });


         this.ordenTransporteService.GetPendientesDespachos(this.model.idcliente
          , this.dateInicio.toLocaleDateString()
          , this.dateFin.toLocaleDateString()
          , this.model.iddepartamento, this.model.idprovincia ).subscribe( resp => {


            this.despachos = resp;


            this.model.anioactual = 2022;

            this.despachos.forEach( x=> {

              if(x.rango === 'hasta7')
                this.model.hasta7_despacho = x.ots;
              if(x.rango === 'hasta50')
                this.model.hasta50_despacho = x.ots;
              if(x.rango === 'hasta100')
                this.model.hasta100_despacho = x.ots;
                if(x.rango === 'masde100')
                this.model.masde100_despacho = x.ots;
                if(x.rango === 'despachados')
                this.model.atiempo_despacho = x.ots;

            });

          this.model.notiempo_despacho = this.model.hasta7_despacho +  this.model.hasta50_despacho + this.model.hasta100_despacho + this.model.masde100_despacho;



          let total_despacho_despacho =  this.model.atiempo_despacho  +   this.model.notiempo_despacho;

          let porcentajeatiempo_despacho =  (this.model.atiempo_despacho  * 100) / total_despacho_despacho;
          let porcentajenotiempo_despacho =  (this.model.notiempo_despacho  * 100) / total_despacho_despacho;

          this.data2 = {
            labels: ['Despachados ' + porcentajeatiempo_despacho.toFixed(2) + '%'
                  ,'Pendientes ' + porcentajenotiempo_despacho.toFixed(2) + '%'],

            datasets: [
                {
                    data: [ porcentajeatiempo_despacho.toFixed(2), porcentajenotiempo_despacho.toFixed(2)],
                    backgroundColor: [
                        "#006400",
                        "#ff0000"
                    ],
                    hoverBackgroundColor: [
                      "#006400",
                      "#ff0000"

                    ]
                }]
            };

         });









         this.ordenTransporteService.GetPendientesEntrega(this.model.idcliente
          , this.dateInicio.toLocaleDateString()
          , this.dateFin.toLocaleDateString()
          , this.model.iddepartamento, this.model.idprovincia ).subscribe( resp => {

            this.entrega = resp;

            this.model.anioactual = 2022;

            this.entrega.forEach( x=> {

              if(x.rango === 'hasta7')
                this.model.hasta7_entrega = x.ots;
              if(x.rango === 'hasta50')
                this.model.hasta50_entrega = x.ots;
              if(x.rango === 'hasta100')
                this.model.hasta100_entrega = x.ots;
                if(x.rango === 'masde100')
                this.model.masde100_entrega = x.ots;
                if(x.rango === 'entregados')
                this.model.atiempo_entrega = x.ots;

            });





          this.model.notiempo_entrega = this.model.hasta7_entrega +  this.model.hasta50_entrega + this.model.hasta100_entrega + this.model.masde100_entrega;


          let total_entrega =  this.model.atiempo_entrega  +   this.model.notiempo_entrega;

          let porcentajeatiempo_entrega =  (this.model.atiempo_entrega  * 100) / total_entrega;
          let porcentajenotiempo_entrega =  (this.model.notiempo_entrega  * 100) / total_entrega;

          this.data3 = {
            labels: [' Entregados ' + porcentajeatiempo_entrega.toFixed(2) + '%'
                  ,'Pendientes de Entrega ' + porcentajenotiempo_entrega.toFixed(2) + '%'],

            datasets: [
                {
                    data: [ porcentajeatiempo_entrega.toFixed(2), porcentajenotiempo_entrega.toFixed(2)],
                    backgroundColor: [
                      "#006400",
                      "#ff0000"
                    ],
                    hoverBackgroundColor: [
                      "#006400",
                      "#ff0000"

                    ]
                }]
            };

         });














      });
  }
  position_StockPorProducto(){
    $('html,body').animate({ scrollTop: 180 }, 'slow');
  }
  position_filtros(){
    $('html,body').animate({ scrollTop: 0 }, 'slow');
  }
  position_cumplimientoentrega(){
    $('html,body').animate({ scrollTop: 780 }, 'slow');
  }
  position_retorno(){
    $('html,body').animate({ scrollTop: 1380 }, 'slow');
  }

  position_mobilevstrafico(){
    $('html,body').animate({ scrollTop: 1980 }, 'slow');
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

   //this.ordenTransporteService.GetReportePendientesDespachos(



    this.ordenTransporteService.GetDespachosConciliacion(
      this.model.idcliente, this.dateInicio.toLocaleDateString(), this.dateFin.toLocaleDateString(),  this.model.iddepartamento, this.model.idprovincia).subscribe( resp => {

        this.despachos = resp;

        this.model.anioactual = 2022;

        this.despachos.forEach( x=> {

          if(x.rango === 'hasta7')
            this.model.hasta7 = x.ots;
          if(x.rango === 'hasta50')
            this.model.hasta50 = x.ots;
          if(x.rango === 'hasta100')
            this.model.hasta100 = x.ots;
            if(x.rango === 'masde100')
            this.model.masde100 = x.ots;
            if(x.rango === 'conciliados')
            this.model.atiempo = x.ots;

        });


        this.loading = false;




      this.model.notiempo = this.model.hasta7 +  this.model.hasta50 + this.model.hasta100 + this.model.masde100;


      let total =  this.model.atiempo  +   this.model.notiempo;

      let porcentajeatiempo =  (this.model.atiempo  * 100) / total;
      let porcentajenotiempo =  (this.model.notiempo  * 100) / total;


      this.data = {
        labels: [' Retornados ' + porcentajeatiempo.toFixed(2) + '%'
              ,'Pendientes de Retorno ' + porcentajenotiempo.toFixed(2) + '%'],

        datasets: [
            {
                data: [ porcentajeatiempo.toFixed(2), porcentajenotiempo.toFixed(2)],
                backgroundColor: [

                    "#006400",
                    "#ff0000"
                ],
                hoverBackgroundColor: [
                  "#006400",
                  "#ff0000"

                ]
            }]
        };

     });





     this.ordenTransporteService.GetPendientesEntrega(this.model.idcliente
      , this.dateInicio.toLocaleDateString()
      , this.dateFin.toLocaleDateString()
      , this.model.iddepartamento, this.model.idprovincia ).subscribe( resp => {

        this.entrega = resp;

        this.model.anioactual = 2022;

        this.entrega.forEach( x=> {

          if(x.rango === 'hasta7')
            this.model.hasta7_entrega = x.ots;
          if(x.rango === 'hasta50')
            this.model.hasta50_entrega = x.ots;
          if(x.rango === 'hasta100')
            this.model.hasta100_entrega = x.ots;
            if(x.rango === 'masde100')
            this.model.masde100_entrega = x.ots;
            if(x.rango === 'entregados')
            this.model.atiempo_entrega = x.ots;

        });





      this.model.notiempo_entrega = this.model.hasta7_entrega +  this.model.hasta50_entrega + this.model.hasta100_entrega + this.model.masde100_entrega;


      let total_entrega =  this.model.atiempo_entrega  +   this.model.notiempo_entrega;

      let porcentajeatiempo_entrega =  (this.model.atiempo_entrega  * 100) / total_entrega;
      let porcentajenotiempo_entrega =  (this.model.notiempo_entrega  * 100) / total_entrega;

      this.data3 = {
        labels: [' Entregados ' + porcentajeatiempo_entrega.toFixed(2) + '%'
              ,'Pendientes de Entrega ' + porcentajenotiempo_entrega.toFixed(2) + '%'],

        datasets: [
            {
                data: [ porcentajeatiempo_entrega.toFixed(2), porcentajenotiempo_entrega.toFixed(2)],
                backgroundColor: [
                  "#006400",
                  "#ff0000"
                ],
                hoverBackgroundColor: [
                  "#006400",
                  "#ff0000"

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
