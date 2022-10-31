import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Vehiculo } from 'src/app/_models/Mantenimiento/vehiculo';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { OrdenTransporteService } from 'src/app/_services/Seguimiento/ordentransporte.service';

@Component({
    template: `
        <p-table #dt1 [value]="products"
            [rowsPerPageOptions]="[10,25,50]"
            [globalFilterFields]="['placa']">
            [paginator]="true" [rows]="5" [responsive]="true">

            <ng-template pTemplate="caption">
                <div class="p-d-flex">
                    <span class="p-input-icon-right p-ml-auto">
                        <i class="pi pi-search"></i>
                        <input pInputText type="text" (input)="dt1.filterGlobal($event.target.value, 'contains')" placeholder="Search keyword" />
                    </span>
                </div>
            </ng-template>

            <ng-template pTemplate="header">
                <tr>
                    <th pSortableColumn="name">Placa <p-sortIcon field="vin"></p-sortIcon></th>
                    <th pSortableColumn="price">Carga Util <p-sortIcon field="price"></p-sortIcon></th>
                    <th pSortableColumn="inventoryStatus">Seleccionar <p-sortIcon field="inventoryStatus"></p-sortIcon></th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-product>
                <tr>
                    <td>{{product.placa}}</td>
                    <td>{{product.cargautil | number:'1.0-0'}}</td>

                    <td>
                        <button type="button" pButton icon="pi pi-check" (click)="selectVehiculo(product)"></button>
                    </td>
                </tr>
            </ng-template>
        </p-table>
    `
})
export class BuscarPlacaComponent implements OnInit {

    products: Vehiculo[];

    constructor(private generalService: GeneralService,
                public ref: DynamicDialogRef,
                private ordenTransporteService: OrdenTransporteService,
                public config: DynamicDialogConfig) { }

    ngOnInit(): void {
        this.generalService.getVehiculos('')
                .subscribe(products =>  this.products = products);

    }

    selectVehiculo(product: Vehiculo) {
        this.ordenTransporteService.getEquipoTransporte(product.placa).subscribe(res =>
            {
                this.ref.close(res);
            });
          }
}
