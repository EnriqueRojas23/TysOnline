import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Vehiculo } from 'src/app/_models/Mantenimiento/vehiculo';
import { Cuadrilla } from 'src/app/_models/Seguimiento/guiaremisionblanco';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { OrdenTransporteService } from 'src/app/_services/Seguimiento/ordentransporte.service';

@Component({
    template: `
    <div class="p-fluid p-grid">
        <div class="col-8 offset-2">
            <label for="dni">DNI</label>
            <input pInputText   class="form-control" maxlength='8' [(ngModel)]="model.dni" name="dni" placeholder="DNI"  type="text">
        </div>
        <div class="col-8 offset-2">
                <label for="nombrecompleto">Nombre completo</label>
                <input pInputText   class="form-control" [(ngModel)]="model.nombrecompleto" name="nombrecompleto" placeholder="Nombre Completo"  type="text">
        </div>
        <div class="col-8 offset-2">
          <button   class='btn-primary btn btn-xs' pButton iconPos="left" label="Agregar" icon="fa fa-file"   (click)="agregar()"  type="button"></button>
        </div>
    </div>

<div class="p-fluid p-grid mt-5">
         
        <p-table #dt1 [value]="cuadrilla"
            [rowsPerPageOptions]="[10,25,50]"
            [globalFilterFields]="['placa']">
            [paginator]="true" [rows]="5" [responsive]="true">


            <ng-template pTemplate="header">
                <tr>
                    <th pSortableColumn="name">Nombre Completo <p-sortIcon field="vin"></p-sortIcon></th>
                    <th pSortableColumn="price">DNI <p-sortIcon field="price"></p-sortIcon></th>
                    <th pSortableColumn="inventoryStatus">Seleccionar <p-sortIcon field="inventoryStatus"></p-sortIcon></th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-product>
                <tr>
                    <td>{{product.nombrecompleto}}</td>
                    <td>{{product.dni }}</td>

                    <td>
                        <button type="button" pButton icon="pi pi-trash" (click)="eliminar(product.id)"></button>
                    </td>
                </tr>
            </ng-template>
        </p-table>
        </div>
    `
})
export class AsignarEstibaComponent implements OnInit {

    cuadrilla: Cuadrilla[];
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
            
               

    }
    agregar() {
        this.model.idordenrecojo = this.id;

         this.ordenTransporteService.GuardarCuadrilla(this.model).subscribe(resp => {
            this.ordenTransporteService.GetAllCuadrilla(this.id)
            .subscribe(products =>  this.cuadrilla = products);

            this.model = {};

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
