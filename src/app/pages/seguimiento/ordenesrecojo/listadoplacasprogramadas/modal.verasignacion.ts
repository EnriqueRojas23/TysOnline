import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Vehiculo } from 'src/app/_models/Mantenimiento/vehiculo';
import { Cuadrilla } from 'src/app/_models/Seguimiento/guiaremisionblanco';
import { OrdenTransporte } from 'src/app/_models/Seguimiento/ordentransporte';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { OrdenTransporteService } from 'src/app/_services/Seguimiento/ordentransporte.service';

@Component({
    template: `
    <div class="row">
    <div class="col-lg-12">
      <div class="card">
            <div class="card-body">
              <p> Cliente: <strong> {{ orden.cliente }} </strong> </p>
              <p> Vehículo:  <strong>  {{ orden.placa }}  </strong> </p>
              <p> Conductor:  <strong> {{ orden.chofer }}  </strong> </p>

              <p> Fecha cita: <strong>  {{ orden.fechacita | date: 'dd/MM/yyyy' }}  </strong>  </p>
              <p> Hora cita: <strong> {{ orden.horacita }}  </strong> </p>
              
            </div>
        </div>
        <div class="card card-full-primary">
        <div class="card-header">Cuadrilla</div>
        <div   *ngFor="let cuadri of cuadrilla">
        <p> <strong> {{ cuadri.dni }}  - {{ cuadri.nombrecompleto }}   </strong>  </p>
      
        </div>
      </div>
    </div>
   

    `
})
export class VerAsignacionComponent implements OnInit {

    cuadrilla: Cuadrilla[];
    orden: OrdenTransporte = {};
    id: any;
    model: any = {};

    constructor(private generalService: GeneralService,
                public ref: DynamicDialogRef,
                private ordenTransporteService: OrdenTransporteService,
                public config: DynamicDialogConfig) { 
                    this.id = config.data.id;
                    
                }

    ngOnInit(): void {
        this.ordenTransporteService.GetAllCuadrilla(this.id)
                .subscribe(products =>  this.cuadrilla = products);
          


        this.ordenTransporteService.GetOrdenRecojoxid(this.id).subscribe(
           resp => this.orden = resp);
    }
    agregar() {
        this.model.idordenrecojo = this.id;

         this.ordenTransporteService.GuardarCuadrilla(this.model).subscribe(resp => {
            this.ordenTransporteService.GetAllCuadrilla(this.id)
            .subscribe(products =>  this.cuadrilla = products);
         })

        
    }

    eliminar(id: any) {
        this.ordenTransporteService.DeleteCuadrilla(id).subscribe(res =>
            {
                this.ordenTransporteService.GetAllCuadrilla(this.id)
                .subscribe(products =>  this.cuadrilla = products);
             });
            
          }
}
