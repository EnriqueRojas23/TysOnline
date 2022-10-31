import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OrdenTransporteService } from 'src/app/_services/Seguimiento/ordentransporte.service';

@Component({
    template: `



  <div class="card card-border-color card-border-color-primary">
  <div class="card-body">
   <div class="row">
          <div class=" ui-md-3 col-3">
                  <h5>Sustento:</h5>
                <p-dropdown name="clientes"  [options]="listaclientes"
                      [(ngModel)]="model.maestroincidenciaid"
                    scrollHeight="40vh"
                    placeholder="seleccione un evento"
                    [style]="{'width':'100%'}"  [resetFilterOnHide]="true"
                    [hideTransitionOptions]="'0ms'"
                    [showTransitionOptions]="'0ms'"   >
                    <ng-template let-item pTemplate="selectedItem">
                          <span style="vertical-align:middle;">{{item.label}}</span>
                      </ng-template>

                </p-dropdown>
            </div>
        <div class="form-group col-4">
        <h6>Documento</h6>
        <textarea rows="2" cols="80" [(ngModel)]="model.observacion" pInputTextarea autoResize="autoResize"></textarea>

      </div>


  </div>

  <div class="form-group col-4">
  <button pButton  class="p-button-danger btn-block" label="Liquidar" (click)="evento()"  >  </button>
  </div>

  </div>



    `
})
export class LiquidarComponent implements OnInit {


    model: any = {};
    id: any;
    ot: any;
    cols2: any[];
    es: any;
    dateInicio: Date = new Date(Date.now()) ;
    listaclientes: SelectItem[] = [];
    off: any  = false;

    constructor(
                public ref: DynamicDialogRef,
                private ordenTransporteService: OrdenTransporteService,
                public messageService: MessageService,
                public config: DynamicDialogConfig) {

                     this.id = config.data.id;
                     this.ot = config.data.ot;



                 }

    ngOnInit(): void {

      this.listaclientes.push({ label: "Manifiesto Firmado", value: 1 });
      this.listaclientes.push({ label: "Factura", value: 2 });
      this.listaclientes.push({ label: "Guía de Remisión", value: 3 });
      this.listaclientes.push({ label: "C-PAN", value: 4 });




      this.es = {
        firstDayOfWeek: 1,
        dayNames: [ 'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' ],
        dayNamesShort: [ 'dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb' ],
        dayNamesMin: [ 'D', 'L', 'M', 'X', 'J', 'V', 'S' ],
        // tslint:disable-next-line: max-line-length
        monthNames: [ 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre' ],
        monthNamesShort: [ 'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic' ],
        today: 'Hoy',
        clear: 'Borrar'
        };

    }

    evento() {
      this.ordenTransporteService.liquidarOT(this.id, this.model.maestroincidenciaid, this.model.observacion).subscribe(list => {
          this.ref.close();

      });

    }

}
