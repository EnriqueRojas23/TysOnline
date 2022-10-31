import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { User } from 'src/app/_models/user';
import { OrdenTransporteService } from 'src/app/_services/Seguimiento/ordentransporte.service';

@Component({
  selector: 'app-porestadosot',
  templateUrl: './porestadosot.component.html',
  styleUrls: ['./porestadosot.component.scss']
})
export class PorestadosotComponent implements OnInit {
  data: any;
  user: User ;
  clientes: SelectItem[] = [];
  model: any = [];
  ubigeo: SelectItem[] = [];
  constructor(private ordenTransporteService: OrdenTransporteService) {
    


   }

  ngOnInit() {



    this.user = JSON.parse(localStorage.getItem('user'));

    this.ordenTransporteService.getClientes('').subscribe(resp => {
      this.clientes.push({ value: '0',  label : 'TODOS LOS CLIENTES'});
      resp.forEach(element => {
          this.clientes.push({ value: element.idcliente ,  label : element.razonsocial});
        });
 
        this.model.idcliente = '0';
      this.ordenTransporteService.getUbigeo('').subscribe(resp => {
        this.ubigeo.push({ value: '0',  label : 'TODOS LOS DESTINOS'});
        resp.forEach(element => {
            this.ubigeo.push({ value: element.iddistrito ,  label : element.ubigeo});
          });
        
        this.model.iddistrito = '0';
      }, error => {
      }, () => {

      

         this.ordenTransporteService.GetAllPorEstado(this.model.idcliente, this.model.iddistrito).subscribe( resp => {
          
          console.log(resp);
          
          this.model.pendientesconciliacion  = resp[1].cantidad;
          this.model.pendientesentrega  = resp[0].cantidad;
          this.model.pendientesdespacho  = resp[2].cantidad;
          this.model.conciliadas  = resp[3].cantidad;
          this.model.facturadas  = resp[4].cantidad;


          let total =  this.model.pendientesentrega  +   this.model.pendientesconciliacion + this.model.conciliadas + this.model.facturadas;
       
          let porcentajentrega =  (this.model.pendientesentrega  * 100) / total;
          let porcentajependienteconciliacion =  (this.model.pendientesconciliacion  * 100) / total;
          let porcentajeconciliadas = (this.model.conciliadas * 100 )/ total;
          let porcentajefacturadas =  (this.model.facturadas  * 100) / total;

          this.data = {
            labels: ['Pendiente de Entregar ' + porcentajentrega.toFixed(2) + '%'
                  ,'Pendiente de Conciliación ' + porcentajependienteconciliacion.toFixed(2) + '%'
                  , 'Conciliadas ' + porcentajeconciliadas.toFixed(2)   + '%'
                  , 'Facturadas ' + porcentajefacturadas.toFixed(2) + '%' ],
            datasets: [
                {
                    data: [ porcentajentrega.toFixed(2), porcentajependienteconciliacion.toFixed(2), porcentajeconciliadas.toFixed(2) , porcentajefacturadas.toFixed(2)],
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ]
                }]    
            };

         })



      });





    });

    }
    buscar() {
      this.ordenTransporteService.GetAllPorEstado(this.model.idcliente, this.model.iddistrito).subscribe( resp => {
          
        console.log(resp);
        
        this.model.pendientesconciliacion  = resp[1].cantidad;
        this.model.pendientesconciliacion  = resp[1].cantidad;
        this.model.pendientesentrega  = resp[0].cantidad;
        this.model.pendientesdespacho  = resp[2].cantidad;
        this.model.conciliadas  = resp[3].cantidad;
        this.model.facturadas  = resp[4].cantidad;


        let total =  this.model.pendientesentrega  +   this.model.pendientesconciliacion + this.model.conciliadas + this.model.facturadas;
     
        let porcentajentrega =  (this.model.pendientesentrega  * 100) / total;
        let porcentajependienteconciliacion =  (this.model.pendientesconciliacion  * 100) / total;
        let porcentajeconciliadas = (this.model.conciliadas * 100 )/ total;
        let porcentajefacturadas =  (this.model.facturadas  * 100) / total;

        this.data = {
          labels: ['Pendiente de Entregar ' + porcentajentrega.toFixed(2) + '%'
                  ,'Pendiente de Conciliación ' + porcentajependienteconciliacion.toFixed(2) + '%'
                  , 'Conciliadas ' + porcentajeconciliadas.toFixed(2)   + '%'
                  , 'Facturadas ' + porcentajefacturadas.toFixed(2) + '%' ],
          datasets: [
              {
                  data: [ porcentajentrega.toFixed(2) , porcentajependienteconciliacion.toFixed(2), porcentajeconciliadas.toFixed(2) , porcentajefacturadas.toFixed(2)],
                  backgroundColor: [
                      "#FF6384",
                      "#36A2EB",
                      "#FFCE56"
                  ],
                  hoverBackgroundColor: [
                      "#FF6384",
                      "#36A2EB",
                      "#FFCE56"
                  ]
              }]    
          };
                  
      //this.data =  [porcentajentrega.toFixed(2), porcentajeconciliacion.toFixed(2), porcentajeconciliadas.toFixed(2) , porcentajefacturadas.toFixed(2)];
      });
    }
    exportExcel() {
      
    }
}
